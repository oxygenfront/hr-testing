import { Injectable, NotFoundException } from '@nestjs/common'
import type { Prisma, Test } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'
import type { QuestionWithAnswers } from 'src/questions/entities/question.entity'
import { QuestionsService } from '../questions/questions.service'
import type { CreateTestDto } from './dto/create-test.dto'
import type { DeleteTestDto } from './dto/delete-test.dto'
import type { UpdateTestDto } from './dto/update-test.dto'
import { TestEntity, TestEntityWithCorrectAnswers, type TestWithQuestions } from './entities/test.entity'

@Injectable()
export class TestsService {
	constructor(
		private prisma: PrismaService,
		private questionsService: QuestionsService
	) {}

	async create(createTestDto: CreateTestDto) {
		const { questionsIds, title = '' } = createTestDto

		const questions = (await this.prisma.question.findMany({
			relationLoadStrategy: 'join',
			where: {
				id: { in: questionsIds },
			},
			include: {
				answers: true,
			},
		})) as Prisma.QuestionWhereUniqueInput[]

		const ids = questions.map((question) => ({ id: question.id }))

		const newTest = await this.prisma.test.create({
			data: {
				title,
				questions: {
					connect: ids,
				},
			},
			include: {
				questions: {
					include: {
						answers: true,
					},
				},
			},
		})

		return this.createTestEntity(newTest)
	}

	async findAll() {
		const tests = await this.prisma.test.findMany({
			include: {
				questions: {
					include: {
						answers: true,
					},
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		return this.createTestsEntity(tests)
	}

	async findOne(id: string) {
		const test = await this.prisma.test.findUnique({
			where: { id },
			include: {
				questions: {
					include: {
						answers: true,
					},
				},
			},
		})

		if (!test) {
			throw new NotFoundException(`Test with ${id} does not exist.`)
		}

		return this.createTestEntity(test)
	}

	async update(updateTestDto: UpdateTestDto) {
		const { id, title, questionsIds } = updateTestDto

		const currentTest = await this.prisma.test.findUnique({
			where: {
				id,
			},
			select: {
				questions: {
					select: {
						id: true,
					},
				},
			},
		})

		const deletedQuestions: { id: string }[] = currentTest.questions.reduce((result, current) => {
			if (!questionsIds.includes(current.id)) {
				result.push({ id: current.id })
			}

			return result
		}, [])

		const newQuestions = questionsIds.map((id) => ({ id }))

		const test = await this.prisma.test.update({
			where: { id },
			data: {
				title,
				questions: {
					disconnect: deletedQuestions,
					connect: newQuestions,
				},
			},
			include: {
				questions: {
					include: {
						answers: true,
					},
				},
			},
		})

		return this.createTestEntity(test)
	}

	delete(deleteTestDto: DeleteTestDto) {
		return this.prisma.test.delete({
			where: { id: deleteTestDto.id },
		})
	}

	createTestEntity(test: Test & { questions: QuestionWithAnswers[] }) {
		const questionsEntity = this.questionsService.createQuestionsWithoutCorrectAnswers(test.questions)

		const testResponse = {
			...test,
			questions: questionsEntity,
		}

		return new TestEntity(testResponse)
	}

	createTestEntityWithCorrectAnswers(test: TestWithQuestions) {
		const questionsEntity = this.questionsService.createQuestionsEntity(test.questions)

		const testResponse = {
			...test,
			questions: questionsEntity,
		}

		return new TestEntityWithCorrectAnswers(testResponse)
	}

	createTestsEntity(tests: TestWithQuestions[]) {
		return tests.map((test) => this.createTestEntityWithCorrectAnswers(test))
	}
}
