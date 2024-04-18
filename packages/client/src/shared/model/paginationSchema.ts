import { z } from 'zod'

export const paginationRequestSchema = z
	.object({
		page: z.number().int().nonnegative().safe(),
		size: z.number().int().nonnegative().safe(),
	})
	.strict()

export const PaginationActionEnum = z.enum(['NEXT_PAGE', 'PREV_PAGE'])

export const paginationActionSchema = z.object({
	type: PaginationActionEnum,
})

export const paginationResponseSchema = z
	.object({
		totalCount: z.number().int().nonnegative().safe(),
		hasNext: z.boolean(),
		hasPrev: z.boolean(),
	})
	.strict()

export type PaginationRequestSchema = z.infer<typeof paginationRequestSchema>
export type PaginationActionSchema = z.infer<typeof paginationActionSchema>
export type PaginationResponseSchema = z.infer<typeof paginationResponseSchema>
