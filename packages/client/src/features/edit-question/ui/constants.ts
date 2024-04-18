import { QuestionTypeEnum, answerUpdateSchema, updateQuestionSchema } from '@/shared/model/questionsSchema'
import { z } from 'zod'

export const answerFormSchema = answerUpdateSchema.extend({
	answerId: z.string().uuid().optional(),
})

export const updateQuestionFormSchema = updateQuestionSchema.omit({ id: true }).extend({
	answers: z.array(answerFormSchema),
})

export type AnswerFormSchema = z.infer<typeof answerFormSchema>
export type UpdateQuestionFormSchema = z.infer<typeof updateQuestionFormSchema>

export const updateQuestionDefaultAnswer: AnswerFormSchema = {
	id: '',
	title: '',
	isCorrect: false,
	answerId: '',
}

export const updateQuestionDefaultValues: UpdateQuestionFormSchema = {
	title: '',
	type: QuestionTypeEnum.enum.checkbox,
	answers: [updateQuestionDefaultAnswer],
}
