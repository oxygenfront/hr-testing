import type { QuestionResponseSchema } from '@/shared/model'

export interface ITestResponse {
	id: string
	questions: QuestionResponseSchema[]
	title: string
}
export type TAnswer = {
	correctAnswers: string[]
	id: string
	questionId: string
	selectedAnswers: string[]
	testResultId: string
}
export interface ITestRequest {
	id: string
	questions: QuestionResponseSchema[]
	title: string
}

export type TTestResult = {
	id: string
	failedAnswers: TAnswer[]
	failedAnswersCount: number
	succeedAnswers: TAnswer[]
	succeedAnswersCount: number
	succeedPercent: number
	userResultId: string
}

export interface ITestResult {
	id: string
	userId: string
	createdAt: string
	userLogin: string
	testTitle: string
	testId: string
	testResult: TTestResult
}

export interface ISelectedOption {
	questionId: string
	answersIds: string[]
}

export interface ITestResultsRequest {
	userId: string
	testId: string
	selectedOptions: ISelectedOption[]
}

export interface ITestUpdateRequest {
	id?: string
	title: string
	questionsIds: string[]
}
