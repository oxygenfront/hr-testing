import { Injectable } from '@nestjs/common'
import type { PaginationParams } from './dto/pagination.dto'
import type { PaginationParamsEntity } from './entities/pagination.entity'

@Injectable()
export class PaginationService {
	getPaginationParams(params: PaginationParams): PaginationParamsEntity {
		const { page, size, totalCount } = params

		const currentPage = page ? Number(page) : 1

		const take = size ? Number(size) : 20
		const skip = currentPage === 1 ? 0 : (currentPage - 1) * take

		const hasNext = totalCount - currentPage * take > 0
		const hasPrev = currentPage !== 1

		return {
			skip,
			take,
			hasNext,
			hasPrev,
			totalCount,
		}
	}
}
