import { createRequest, rootApi } from '@/shared/api'
import {
	ApiTag,
	CREATE_RESULT_API,
	CREATE_TEST_API,
	DELETE_TEST_API,
	GET_RESULTS_API,
	GET_TESTS_API,
	RequestMethod,
	UPDATE_TEST_API,
} from '@/shared/api'
import { GET_RESULT_REPORT_API } from '@/shared/api/utils/constants'
import type { ITestResponse, ITestResult, ITestResultsRequest, ITestUpdateRequest } from '@/shared/model'
import { downloadFile } from '@/shared/model/downloadFile'

export const testsApi = rootApi.injectEndpoints({
	endpoints: (builder) => ({
		createTest: builder.mutation<unknown, ITestUpdateRequest>({
			query: (body) => createRequest(CREATE_TEST_API, RequestMethod.POST, body),
			invalidatesTags: [ApiTag.TESTS],
		}),
		updateTest: builder.mutation<unknown, ITestUpdateRequest>({
			query: (body) => createRequest(UPDATE_TEST_API, RequestMethod.PUT, body),
			invalidatesTags: [ApiTag.TEST, ApiTag.TESTS],
		}),
		deleteTest: builder.mutation<void, { id: string }>({
			query: (body) => createRequest(DELETE_TEST_API, RequestMethod.DELETE, body),
			invalidatesTags: [ApiTag.TESTS],
		}),
		createResultTest: builder.mutation<unknown, ITestResultsRequest>({
			query: (body) => createRequest(CREATE_RESULT_API, RequestMethod.POST, body),
			invalidatesTags: [ApiTag.RESULTS],
		}),
		deleteResult: builder.mutation<void, string[]>({
			query: (body) => createRequest(DELETE_TEST_API, RequestMethod.DELETE, body),
			invalidatesTags: [ApiTag.RESULTS],
		}),
		getTests: builder.query<ITestResponse[], void>({
			query: () => GET_TESTS_API,
			providesTags: [ApiTag.TESTS],
		}),
		getTestById: builder.query<ITestResponse, string | undefined>({
			query: (id) => `${GET_TESTS_API}/${id}`,
			providesTags: [ApiTag.TEST],
		}),
		getResultsTest: builder.query<ITestResult[], void>({
			query: () => GET_RESULTS_API,
			providesTags: [ApiTag.RESULTS],
		}),
		getResultById: builder.query<ITestResult, string | undefined>({
			query: (id) => `${GET_RESULTS_API}/${id}`,
			providesTags: [ApiTag.TEST],
		}),
		getResultReportById: builder.query<unknown, string>({
			query: (id) => ({
				url: `${GET_RESULT_REPORT_API}/${id}`,
				responseHandler: async (response) => {
					if (!response.ok) {
						return
					}

					const data = await response.blob()

					const header = response.headers.get('Content-Disposition')

					const fileName = decodeURI(header?.split('filename*=UTF-8').at(1)?.slice(2) ?? 'result_report.pdf')

					downloadFile(data, fileName)
				},
			}),
		}),
	}),
})

export const {
	useCreateTestMutation,
	useDeleteTestMutation,
	useGetTestByIdQuery,
	useDeleteResultMutation,
	useLazyGetTestByIdQuery,
	useGetTestsQuery,
	useUpdateTestMutation,
	useCreateResultTestMutation,
	useGetResultsTestQuery,
	useGetResultByIdQuery,
	useLazyGetResultReportByIdQuery,
} = testsApi
