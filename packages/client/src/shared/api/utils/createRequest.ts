import type { RequestMethod } from '@/shared/api'

export const createRequest = (url: string, method: RequestMethod, body: unknown) => ({
	url,
	method,
	body,
})
