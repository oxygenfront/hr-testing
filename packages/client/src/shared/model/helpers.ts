import { PaginationActionEnum, type PaginationActionSchema, type PaginationRequestSchema } from './paginationSchema'

export function pagination(state: PaginationRequestSchema, action: PaginationActionSchema) {
	const actions = {
		[PaginationActionEnum.enum.NEXT_PAGE]: { ...state, page: state.page + 1 },
		[PaginationActionEnum.enum.PREV_PAGE]: { ...state, page: state.page - 1 },
	}

	return actions[action.type]
}
