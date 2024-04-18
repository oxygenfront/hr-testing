import { Injectable, NotFoundException } from '@nestjs/common'
import { UserResult } from '@prisma/client'
import type { Response } from 'express'
import { PrismaService } from 'nestjs-prisma'
// biome-ignore lint/style/noNamespaceImport: because it's not work in other way
import * as PDFDocument from 'pdfkit'
import type { TestWithQuestions } from 'src/tests/entities/test.entity'
import type { CreateResultDto, SelectedOption } from './dto/create-result.dto'
import { DeleteResultsDto } from './dto/delete-results.dto'
import { TestResultEntity, type TestResultWithAnswers, UserResultEntity } from './entities/result.entity'

@Injectable()
export class ResultsService {
	constructor(private prisma: PrismaService) {}

	async create(createResultDto: CreateResultDto) {
		const { userId, testId, selectedOptions } = createResultDto

		const userData = await this.prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				fullName: true,
			},
		})

		const test = await this.prisma.test.findUnique({
			where: {
				id: testId,
			},
			include: {
				questions: {
					include: {
						answers: true,
					},
				},
			},
		})

		if (!test) {
			throw new NotFoundException(`Test with ${testId} does not exist.`)
		}

		const testResult = this.createTestResult(test, selectedOptions)
		const testResultEntity = this.createTestResultEntity(testResult)

		await this.prisma.userResult.create({
			data: {
				userId,
				testId,
				testTitle: test.title,
				userLogin: userData.fullName,
				testResult: {
					create: {
						succeedAnswersCount: testResult.succeedAnswersCount,
						failedAnswersCount: testResult.failedAnswersCount,
						succeedPercent: testResult.succeedPercent,
						succeedAnswers: {
							createMany: {
								data: testResult.succeedAnswers,
							},
						},
						failedAnswers: {
							createMany: {
								data: testResult.failedAnswers,
							},
						},
					},
				},
			},
			include: {
				testResult: {
					include: {
						succeedAnswers: true,
						failedAnswers: true,
					},
				},
			},
		})

		return {
			userId,
			testId,
			testResult: testResultEntity,
		}
	}

	createTestResult(test: TestWithQuestions, selectedOptions: SelectedOption[]) {
		const { questions } = test

		function resultFunction(
			result: Omit<TestResultEntity, 'id' | 'succeedPercent'>,
			currentOption: SelectedOption
		) {
			const question = questions?.find((element) => element.id === currentOption.questionId)

			if (question) {
				const { answers, id } = question
				const { answersIds } = currentOption

				const correctAnswers = answers.filter((answer) => answer.isCorrect).map((answer) => answer.id)

				if (
					correctAnswers.length !== answersIds.length ||
					new Set([...correctAnswers, ...answersIds]).size !== correctAnswers.length
				) {
					result.failedAnswersCount += 1
					result.failedAnswers.push({
						questionId: id,
						correctAnswers,
						selectedAnswers: answersIds,
					})

					return result
				}

				result.succeedAnswersCount += 1
				result.succeedAnswers.push({
					questionId: id,
					selectedAnswers: answersIds,
				})
			}

			return result
		}

		const testResult = selectedOptions.reduce(resultFunction, {
			succeedAnswersCount: 0,
			failedAnswersCount: 0,

			succeedAnswers: [],
			failedAnswers: [],
		})

		const succeedPercent = Math.round((testResult.succeedAnswersCount / questions.length) * 100)

		return {
			...testResult,
			succeedPercent,
		}
	}

	async findAll() {
		const usersResult = await this.prisma.userResult.findMany({
			include: {
				testResult: {
					include: {
						succeedAnswers: true,
						failedAnswers: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return usersResult
	}

	async findOne(id: string) {
		const userResult = await this.prisma.userResult.findUnique({
			where: { id },
			include: {
				testResult: {
					include: {
						succeedAnswers: true,
						failedAnswers: true,
					},
				},
			},
		})

		if (!userResult) {
			throw new NotFoundException(`Result with ${id} does not exist.`)
		}

		return this.createUserResultEntity(userResult)
	}

	delete(deleteResultsDto: DeleteResultsDto) {
		return this.prisma.userResult.deleteMany({
			where: {
				id: {
					in: deleteResultsDto.ids,
				},
			},
		})
	}

	async createReportFile(res: Response, id: string) {
		const userResult = await this.prisma.userResult.findUnique({
			where: { id },
			include: {
				testResult: {
					include: {
						succeedAnswers: true,
						failedAnswers: true,
					},
				},
			},
		})

		const buffer = await this.createUserResultReport(userResult)

		if (!userResult) {
			throw new NotFoundException(`Test result with ${id} does not exist.`)
		}

		const newFileName = encodeURIComponent(`test_result_${userResult.userLogin}.pdf`)

		res.set({
			'Content-Type': 'application/pdf; charset=utf-8',
			'Content-Disposition': `attachment; filename*=UTF-8\'\'${newFileName}`,
			// 'Content-Disposition': `attachment; filename=test_result_${userResult.id}.pdf`,
			'Content-Length': buffer.length,
		})

		res.end(buffer)
	}

	createTestResultEntity(result: TestResultWithAnswers) {
		return new TestResultEntity(result)
	}

	createUserResultEntity(result: UserResult) {
		return new UserResultEntity(result)
	}

	async createUserResultReport({ testTitle, testResult, userLogin }: UserResultEntity) {
		let testResultMarker = 'good'

		if (testResult.succeedPercent < 50) {
			testResultMarker = 'bad'
		} else if (testResult.succeedPercent >= 50 && testResult.succeedPercent < 80) {
			testResultMarker = 'normal'
		}

		const resultColors = {
			good: 'gold',
			normal: 'green',
			bad: 'red',
		}

		const resultColor = resultColors[testResultMarker]

		const pdfBuffer: Buffer = await new Promise((resolve) => {
			const report = new PDFDocument({
				lang: 'ru-Ru',
				font: 'Courier',
				displayTitle: true,
				permissions: {
					printing: 'highResolution',
					copying: true,
					modifying: false,
					annotating: true,
					contentAccessibility: true,
				},
			})

			report.info.Title = `Результат прохождения теста: ${testTitle} кандидатом: ${userLogin}`

			report
				.font('fonts/Andika-Regular.ttf')
				.fontSize(24)
				.markContent('H1', { lang: 'ru-Ru' })
				.text('Результат прохождения теста')
				.endMarkedContent()
				.moveDown(1)

			report.fontSize(20).markContent('H2', { lang: 'ru-Ru' }).text(`Кандидат: ${userLogin}`).moveDown(0.5)
			report.text(`Тест: ${testTitle}`).endMarkedContent().moveDown(1)

			report
				.fontSize(18)
				.fillColor('green')
				.markContent('Span', { lang: 'ru-Ru' })
				.text(`Количество правильно отвеченных вопросов: ${testResult.succeedAnswersCount}`)
				.moveDown(0.5)
			report
				.fillColor('red')
				.text(`Количество неправильно отвеченных вопросов: ${testResult.failedAnswersCount}`)
				.endMarkedContent()
				.moveDown(1)

			report
				.fontSize(20)
				.fillColor(resultColor)
				.markContent('Span', { lang: 'ru-Ru' })
				.text(`Процент успешно отвеченных вопросов: ${testResult.succeedPercent}%`)
				.endMarkedContent()

			report.end()

			const buffer = []
			report.on('data', buffer.push.bind(buffer))
			report.on('end', () => {
				const data = Buffer.concat(buffer)
				resolve(data)
			})
		})

		return pdfBuffer
	}
}
