import type { QuestionResponseSchema } from '@/shared/model'

export interface IContentBlockProps {
	totalCountQuestions?: number
	question: QuestionResponseSchema
	questionIndex: number
	onFocus?: string
}
