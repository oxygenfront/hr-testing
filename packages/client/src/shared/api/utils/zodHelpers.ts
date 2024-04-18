import type { ZodSchema } from 'zod'

import type { BaseQueryApi } from '@reduxjs/toolkit/query'

export function baseZodErrorHelper(zodSchema: ZodSchema, data: unknown, api: BaseQueryApi) {
	const zodSchemaResult = zodSchema.safeParse(data)

	if (!zodSchemaResult.success && import.meta.env.DEV) {
		console.error(data)
		console.error(`API: ${api.endpoint}; Error: ${zodSchemaResult.error}`)
	}
}
