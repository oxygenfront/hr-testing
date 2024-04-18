import { Injectable, NotFoundException } from '@nestjs/common'
import type { Answer } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import type { Pagination } from '../pagination/dto/pagination.dto'
import { PaginationService } from '../pagination/pagination.service'
import type { CreateQuestionDto } from './dto/create-question.dto'
import type { DeleteQuestionDto } from './dto/delete-question.dto'
import type { UpdateAnswerDto, UpdateQuestionDto } from './dto/update-question.dto'
import { AnswerEntity, AnswersWithoutIsCorrect, QuestionEntity } from './entities/question.entity'
import type { QuestionWithAnswers } from './entities/question.entity'

@Injectable()
export class QuestionsService {
	constructor(
		private prisma: PrismaService,
		private pagination: PaginationService
	) {}

	async create(createQuestionDto: CreateQuestionDto) {
		const { title, type, answers } = createQuestionDto

		const question = await this.prisma.question.create({
			data: {
				title,
				type,
				answers: {
					createMany: {
						data: answers,
					},
				},
			},
			include: {
				answers: true,
			},
		})

		const answersEntity = this.createAnswersEntity(question.answers)

		const responseQuestion = {
			...question,
			answers: answersEntity,
		}

		return new QuestionEntity(responseQuestion)
	}

	async createMany(createQuestionDto: CreateQuestionDto[]) {
		const result = []
		for (const question of createQuestionDto) {
			const newQuestion = await this.create(question)

			result.push(newQuestion)
		}

		return result
	}

	async findAll(params: Pagination) {
		const { page, size } = params

		const totalCount = await this.prisma.question.count()

		const { skip, take, hasNext, hasPrev } = this.pagination.getPaginationParams({
			page,
			size,
			totalCount,
		})

		const questions = await this.prisma.question.findMany({
			skip,
			take,
			include: {
				answers: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		const questionsEntity = this.createQuestionsEntity(questions)

		return {
			questions: questionsEntity,
			meta: {
				totalCount,
				hasNext,
				hasPrev,
			},
		}
	}

	async findOne(id: string) {
		const question = await this.prisma.question.findUnique({
			where: { id },
			include: {
				answers: {
					orderBy: {
						createdAt: 'asc',
					},
				},
			},
		})

		if (!question) {
			throw new NotFoundException(`Question with ${id} does not exist.`)
		}

		return this.createQuestionEntity(question)
	}

	async update(updateQuestionDto: UpdateQuestionDto) {
		const { id, title, type, answers } = updateQuestionDto

		if (answers?.length) {
			await this.updateAnswers(answers, id)
		}

		const question = await this.prisma.question.update({
			where: { id },
			data: {
				title,
				type,
			},
			include: {
				answers: {
					orderBy: {
						createdAt: 'asc',
					},
				},
			},
		})

		return this.createQuestionEntity(question)
	}

	async updateAnswers(answers: UpdateAnswerDto[], questionId: string) {
		type Result = Record<'updated' | 'deleted' | 'added', UpdateAnswerDto[]>

		const currentQuestion = await this.prisma.question.findUnique({
			where: {
				id: questionId,
			},
			select: {
				answers: true,
			},
		})

		const comparedAnswers = answers.reduce<Result>(
			(result, current) => {
				const deletedAnswers = currentQuestion.answers.filter(
					(item) => !answers.find((answer) => answer.id === item.id)
				)

				result.deleted = deletedAnswers

				const currentAnswer = currentQuestion.answers.find((item) => item.id === current.id)

				if (!currentAnswer) {
					result.added.push(current)

					return result
				}

				if (currentAnswer.title !== current.title || currentAnswer.isCorrect !== current.isCorrect) {
					result.updated.push(current)
				}

				return result
			},
			{
				updated: [],
				deleted: [],
				added: [],
			}
		)

		if (comparedAnswers.added.length) {
			await this.prisma.question.update({
				where: {
					id: questionId,
				},
				data: {
					answers: {
						createMany: {
							data: comparedAnswers.added,
						},
					},
				},
			})
		}

		if (comparedAnswers.updated.length) {
			const promises = answers.map((answer) => {
				return this.prisma.answer.update({
					where: {
						id: answer.id,
					},
					data: answer,
				})
			})

			await Promise.allSettled(promises)
		}

		if (comparedAnswers.deleted.length) {
			const deletedIds = comparedAnswers.deleted.map((item) => ({ id: item.id }))

			await this.prisma.question.update({
				where: { id: questionId },
				data: {
					answers: {
						deleteMany: deletedIds,
					},
				},
			})
		}
	}

	delete(deleteQuestionDto: DeleteQuestionDto) {
		return this.prisma.question.delete({
			where: { id: deleteQuestionDto.id },
		})
	}

	createAnswerEntity(answer: Answer) {
		return new AnswerEntity(answer)
	}

	createAnswerWithoutIsCorrectEntity(answer: Answer) {
		return new AnswersWithoutIsCorrect(answer)
	}

	createAnswersEntity(answers: Answer[]) {
		return answers.map((answer) => this.createAnswerEntity(answer))
	}

	createAnswersWithoutIsCorrectEntity(answers: Answer[]) {
		return answers.map((answer) => this.createAnswerWithoutIsCorrectEntity(answer))
	}

	createQuestionEntity(question: QuestionWithAnswers) {
		const answersEntity = this.createAnswersEntity(question.answers)

		const questionResponse = {
			...question,
			answers: answersEntity,
		}

		return new QuestionEntity(questionResponse)
	}

	createQuestionWithoutCorrectAnswersEntity(question: QuestionWithAnswers) {
		const answersEntity = this.createAnswersWithoutIsCorrectEntity(question.answers)

		const questionResponse = {
			...question,
			answers: answersEntity,
		}

		return new QuestionEntity(questionResponse)
	}

	createQuestionsEntity(questions: QuestionWithAnswers[]) {
		return questions.map((question) => this.createQuestionEntity(question))
	}

	createQuestionsWithoutCorrectAnswers(questions: QuestionWithAnswers[]) {
		return questions.map((question) => {
			const { ...rest } = this.createQuestionWithoutCorrectAnswersEntity(question)

			return new QuestionEntity(rest)
		})
	}
}
