import { ApiHideProperty } from '@nestjs/swagger'
import type { Answer, Question } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class AnswerEntity implements Answer {
	constructor(partial: Partial<AnswerEntity>) {
		Object.assign(this, partial)
	}

	id: string
	title: string
	isCorrect: boolean

	@ApiHideProperty()
	@Exclude()
	questionId: string | null

	@ApiHideProperty()
	@Exclude()
	createdAt: Date

	@ApiHideProperty()
	@Exclude()
	updatedAt: Date
}

export class QuestionEntity implements Omit<Question, 'testId'> {
	constructor(partial: Partial<QuestionEntity>) {
		Object.assign(this, partial)
	}

	id: string
	title: string
	type: string
	answers: AnswerEntity[]

	@ApiHideProperty()
	@Exclude()
	createdAt: Date

	@ApiHideProperty()
	@Exclude()
	updatedAt: Date

	@ApiHideProperty()
	@Exclude()
	testId: string
}

export class AnswersWithoutIsCorrect implements AnswerEntity {
	constructor(partial: Partial<AnswerEntity>) {
		Object.assign(this, partial)
	}

	id: string
	title: string

	@ApiHideProperty()
	@Exclude()
	isCorrect: boolean

	@ApiHideProperty()
	@Exclude()
	questionId: string | null

	@ApiHideProperty()
	@Exclude()
	createdAt: Date

	@ApiHideProperty()
	@Exclude()
	updatedAt: Date
}

export class QuestionWithoutCorrectAnswersEntity implements QuestionEntity {
	constructor(partial: Partial<QuestionEntity>) {
		Object.assign(this, partial)
	}

	id: string
	title: string
	type: string
	answers: AnswersWithoutIsCorrect[]

	@ApiHideProperty()
	@Exclude()
	createdAt: Date

	@ApiHideProperty()
	@Exclude()
	updatedAt: Date

	@ApiHideProperty()
	@Exclude()
	testId: string
}

export interface QuestionWithAnswers extends Question {
	answers: Answer[]
}
