import type { AnswerResponseSchema, QuestionResponseSchema, QuestionType, TTestResult } from '@/shared/model'
import type { Dispatch, SetStateAction } from 'react'
export interface ContentBlockAdminProps {
	testResult: TTestResult
	question: QuestionResponseSchema
}
export interface IAnswerProps {
	setWrongAnswer: Dispatch<SetStateAction<boolean>>
	answer: AnswerResponseSchema
	type: QuestionType
	selectedAnswers: string[]
	correctAnswers: string[]
}
