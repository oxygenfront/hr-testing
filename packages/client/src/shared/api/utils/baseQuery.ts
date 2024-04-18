import type { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

import { API_BASE_URL } from '@/shared/api'
import { baseZodErrorHelper } from '@/shared/api'
import type { ZodSchema } from 'zod'

interface BaseFetchExtraOptions extends Record<string, unknown> {
	zodSchema?: ZodSchema
}

export const baseQueryFunction = async (
	args: string | FetchArgs,
	api: BaseQueryApi,
	extraOptions: BaseFetchExtraOptions
) => {
	const response = await fetchBaseQuery({
		baseUrl: API_BASE_URL,
		credentials: 'include',
		mode: 'cors',
		prepareHeaders: (headers) => {
			const token = sessionStorage.getItem('token')

			if (token) {
				headers.set('authorization', `Bearer ${token}`)
			}

			return headers
		},
	})(args, api, extraOptions)

	const responseMeta = response.meta
	const responseData = response.data

	if (responseMeta?.response) {
		const { ok } = responseMeta.response
		if (!ok && responseMeta?.response.status === 401) {
			// TODO add redirect
			sessionStorage.removeItem('token')
		}

		if (ok && responseData && extraOptions && extraOptions.zodSchema) {
			baseZodErrorHelper(extraOptions.zodSchema, responseData, api)
		}
	}

	return response
}

export type TBaseQueryFn = typeof baseQueryFunction
