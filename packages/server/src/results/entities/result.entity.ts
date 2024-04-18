import { ApiHideProperty } from '@nestjs/swagger'
import type { TestResult, TestResultFailedAnswer, TestResultSucceedAnswer, UserResult } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class TestResultSucceedAnswerEntity implements Omit<TestResultSucceedAnswer, 'testResultId' | 'id'> {
	constructor(partial: Partial<TestResultSucceedAnswerEntity>) {
		Object.assign(this, partial)
	}

	questionId: string
	selectedAnswers: string[]
}

export class TestResultFailedAnswerEntity implements Omit<TestResultFailedAnswer, 'testResultId' | 'id'> {
	constructor(partial: Partial<TestResultFailedAnswerEntity>) {
		Object.assign(this, partial)
	}

	questionId: string
	selectedAnswers: string[]
	correctAnswers: string[]
}

export class TestResultEntity implements Omit<TestResult, 'userResultId'> {
	constructor(partial: Partial<TestResultEntity>) {
		Object.assign(this, partial)
	}

	succeedPercent: number

	@ApiHideProperty()
	@Exclude()
	id: string

	@ApiHideProperty()
	@Exclude()
	succeedAnswersCount: number

	@ApiHideProperty()
	@Exclude()
	failedAnswersCount: number

	@ApiHideProperty()
	@Exclude()
	succeedAnswers: TestResultSucceedAnswerEntity[]

	@ApiHideProperty()
	@Exclude()
	failedAnswers: TestResultFailedAnswerEntity[]
}

export class UserResultEntity implements UserResult {
	constructor(partial: Partial<UserResultEntity>) {
		Object.assign(this, partial)
	}

	id: string
	userId: string
	testId: string
	userLogin: string
	testTitle: string
	testResult: TestResultEntity
	createdAt: Date
	updatedAt: Date
}

export interface TestResultWithAnswers extends Omit<TestResult, 'userResultId' | 'id'> {
	succeedAnswers: Omit<TestResultSucceedAnswer, 'testResultId' | 'id'>[]
	failedAnswers: Omit<TestResultFailedAnswer, 'testResultId' | 'id'>[]
}

export interface UserResultWithTestResult extends UserResult {
	testResult: TestResultWithAnswers
}
