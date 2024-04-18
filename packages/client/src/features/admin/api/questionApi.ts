import { createRequest, rootApi } from '@/shared/api'
import {
	ApiTag,
	CREATE_QUESTION_API,
	DELETE_QUESTION_API,
	GET_QUESTIONS_API,
	RequestMethod,
	UPDATE_QUESTION_API,
} from '@/shared/api'
import { questionResponseSchema } from '@/shared/model'
import type { CreateQuestionSchema, QuestionResponseSchema, UpdateQuestionSchema } from '@/shared/model'
import type { PaginationRequestSchema } from '@/shared/model/paginationSchema'
import type { QuestionsResponseSchema } from '@/shared/model/questionsSchema'

export const questionsApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		createQuestion: builder.mutation<QuestionResponseSchema, CreateQuestionSchema>({
			query: (body) => createRequest(CREATE_QUESTION_API, RequestMethod.POST, body),
			invalidatesTags: (_result, error) => {
				if (error) {
					return []
				}

				return [ApiTag.QUESTIONS]
			},
			extraOptions: {
				zodSchema: questionResponseSchema,
			},
		}),
		updateQuestion: builder.mutation<QuestionResponseSchema, UpdateQuestionSchema>({
			query: (body) => createRequest(UPDATE_QUESTION_API, RequestMethod.PUT, body),
			async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
				const patchResult = dispatch(
					questionsApi.util.updateQueryData('getQuestionById', id, (draft) => {
						Object.assign(draft, patch)
					})
				)
				try {
					await queryFulfilled
				} catch {
					patchResult.undo()
				}
			},
			extraOptions: {
				zodSchema: questionResponseSchema,
			},
		}),
		deleteQuestion: builder.mutation<void, { id: string }>({
			query: (id) => createRequest(DELETE_QUESTION_API, RequestMethod.DELETE, id),
			invalidatesTags: [ApiTag.QUESTIONS],
		}),
		getQuestions: builder.query<QuestionsResponseSchema, PaginationRequestSchema>({
			query: ({ page, size }) => ({
				url: GET_QUESTIONS_API,
				params: { page, size },
			}),
			providesTags: [ApiTag.QUESTIONS],
		}),
		getQuestionById: builder.query<QuestionResponseSchema, string | undefined>({
			query: (id) => `${GET_QUESTIONS_API}/${id}`,
			providesTags: [ApiTag.QUESTION],
		}),
	}),
})

export const {
	useCreateQuestionMutation,
	useUpdateQuestionMutation,
	useDeleteQuestionMutation,
	useGetQuestionByIdQuery,
	useLazyGetQuestionByIdQuery,
	useGetQuestionsQuery,
} = questionsApi
