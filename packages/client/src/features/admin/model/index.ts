import type { SignupResponseSchema } from '@/shared/model'
import type { PaginationResponseSchema } from '@/shared/model/paginationSchema'

export interface UsersResponse {
	users: SignupResponseSchema[]
	meta: PaginationResponseSchema
}
