import type { Answer, CreateQuestionSchema } from '@/shared/model'
import { QuestionTypeEnum } from '@/shared/model/questionsSchema'

export const createQuestionDefaultAnswer: Answer = {
	title: '',
	isCorrect: false,
}

export const createQuestionDefaultValues: CreateQuestionSchema = {
	title: '',
	type: QuestionTypeEnum.enum.checkbox,
	answers: [createQuestionDefaultAnswer],
}
