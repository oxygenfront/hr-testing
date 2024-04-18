import type { QuestionResponseSchema, QuestionType } from '@/shared/model'

export interface IAnswerProps {
	question: QuestionResponseSchema
	indexQuestion: number
	type: QuestionType
}
