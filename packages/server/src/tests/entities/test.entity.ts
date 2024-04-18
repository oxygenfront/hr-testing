import { ApiHideProperty } from '@nestjs/swagger'
import type { Test } from '@prisma/client'
import { Exclude } from 'class-transformer'
import type {
	QuestionEntity,
	QuestionWithAnswers,
	QuestionWithoutCorrectAnswersEntity,
} from '../../questions/entities/question.entity'

export class TestEntity implements Test {
	constructor(partial: Partial<TestEntity>) {
		Object.assign(this, partial)
	}

	id: string
	questions: QuestionWithoutCorrectAnswersEntity[]
	title: string

	@ApiHideProperty()
	@Exclude()
	createdAt: Date

	@ApiHideProperty()
	@Exclude()
	updatedAt: Date
}

export class TestEntityWithCorrectAnswers extends TestEntity {
	questions: QuestionEntity[]
}

export interface TestWithQuestions extends Test {
	questions: QuestionWithAnswers[]
}

export interface TestWithCorrectAnswers extends TestWithQuestions {
	correctAnswers: string[]
}
