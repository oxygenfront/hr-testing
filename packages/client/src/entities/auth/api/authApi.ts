import { AUTH_API, AUTH_LOGIN_API, ApiTag, RequestMethod, createRequest, rootApi } from '@/shared/api'

import type { SignupResponseSchema } from '@/shared/model'
import { isIncorrectPasswordError, isNotFoundError } from '@/shared/model/errorTypes'
import type { LoginSchema } from '@/shared/model/loginSchema'

export const authApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		getAuth: builder.query<{ user: SignupResponseSchema }, void>({
			query: () => AUTH_API,
			providesTags: [ApiTag.AUTH],
		}),
		login: builder.mutation<{ accessToken: string }, LoginSchema>({
			query: (body) => createRequest(AUTH_LOGIN_API, RequestMethod.POST, body),
			transformResponse: (data: { accessToken: string }) => {
				if (data.accessToken) {
					sessionStorage.setItem('token', data.accessToken)
				}

				return data
			},
			transformErrorResponse: (response, _meta, arg) => {
				sessionStorage.removeItem('token')

				if (isNotFoundError(response)) {
					return {
						message: `Пользователь с логином: ${arg.login} не найден`,
						statusCode: response.status,
					}
				}

				if (isIncorrectPasswordError(response)) {
					return {
						message: `Неверный пароль для пользователя: ${arg.login}`,
						statusCode: response.status,
					}
				}

				return {
					message:
						'Возникла непредвиденная ошибка при логине пользователя. Попробуйте позже или обратитесь в поддержку',
					statusCode: response.status,
				}
			},
			invalidatesTags: (result, error) => {
				if (!result || error) {
					return []
				}

				return [ApiTag.AUTH]
			},
		}),
	}),
	overrideExisting: false,
})

export const { useLoginMutation, useGetAuthQuery } = authApi
