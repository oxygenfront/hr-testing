import { z } from 'zod'
import { paginationResponseSchema } from './paginationSchema'

export const QuestionTypeEnum = z.enum(['checkbox', 'radio'])

const answerSchema = z
	.object({
		title: z.string().trim().min(1, { message: 'Введите ответ' }),
		isCorrect: z.boolean(),
	})
	.strict()

export const answerResponseSchema = answerSchema
	.extend({
		id: z.string().uuid(),
	})
	.strict()

export const answerUpdateSchema = answerResponseSchema.partial({ id: true })

export const createQuestionSchema = z
	.object({
		title: z.string().trim().min(1, { message: 'Введите описание вопроса' }),
		type: QuestionTypeEnum,
		answers: z.array(answerSchema).min(1).max(4),
	})
	.strict()

export const questionResponseSchema = createQuestionSchema
	.extend({
		id: z.string().uuid(),
		answers: z.array(answerResponseSchema),
	})
	.strict()

export const updateQuestionSchema = createQuestionSchema.partial().extend({
	id: z.string().uuid(),
	answers: z.array(answerUpdateSchema).optional(),
})

export const questionsResponseSchema = z.object({
	questions: z.array(questionResponseSchema),
	meta: paginationResponseSchema,
})

export type QuestionType = z.infer<typeof QuestionTypeEnum>
export type Answer = z.infer<typeof answerSchema>
export type CreateQuestionSchema = z.infer<typeof createQuestionSchema>
export type QuestionResponseSchema = z.infer<typeof questionResponseSchema>
export type QuestionsResponseSchema = z.infer<typeof questionsResponseSchema>
export type UpdateQuestionSchema = z.infer<typeof updateQuestionSchema>
export type AnswerResponseSchema = z.infer<typeof answerResponseSchema>
export type AnswerUpdateSchema = z.infer<typeof answerUpdateSchema>
