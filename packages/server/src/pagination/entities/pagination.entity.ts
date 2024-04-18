import { IsBoolean, IsInt, IsNumber } from 'class-validator'

export class PaginationEntity {
	@IsNumber()
	@IsInt()
	totalCount: number

	@IsBoolean()
	hasNext: boolean

	@IsBoolean()
	hasPrev: boolean
}

export class PaginationParamsEntity extends PaginationEntity {
	@IsNumber()
	@IsInt()
	skip: number

	@IsNumber()
	@IsInt()
	take: number
}
