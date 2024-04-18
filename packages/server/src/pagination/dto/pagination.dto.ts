import { IsInt, IsNumber, IsString } from 'class-validator'

export class Pagination {
	@IsString()
	page?: string

	@IsString()
	size?: string
}

export class PaginationParams extends Pagination {
	@IsNumber()
	@IsInt()
	totalCount: number
}
