import { RequestMethod, USER_SIGNUP_API, createRequest, rootApi } from '@/shared/api'
import { ApiTag, GET_USERS_API } from '@/shared/api'
import {
	type SignupResponseSchema,
	type SignupSchema,
	isCreateConflictError,
	signupResponseSchema,
} from '@/shared/model'
import type { PaginationRequestSchema } from '@/shared/model/paginationSchema'
import type { UsersResponse } from '../model'

export const usersApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query<UsersResponse, PaginationRequestSchema>({
			query: ({ page, size }) => ({
				url: GET_USERS_API,
				params: { page, size },
			}),
			providesTags: [ApiTag.USERS],
		}),
		signup: builder.mutation<SignupResponseSchema, SignupSchema>({
			query: (body) => createRequest(USER_SIGNUP_API, RequestMethod.POST, body),
			transformErrorResponse: (response, _meta, arg) => {
				if (isCreateConflictError(response)) {
					return {
						message: `Пользователь с данным email:${arg.login} уже зарегистрирован`,
						statusCode: response.status,
					}
				}

				return {
					message:
						'Возникла непредвиденная ошибка при регистрации пользователя. Попробуйте позже или обратитесь в поддержку',
					statusCode: response.status,
				}
			},
			extraOptions: { zodSchema: signupResponseSchema },
		}),
	}),
})

export const { useGetUsersQuery, useSignupMutation } = usersApi
