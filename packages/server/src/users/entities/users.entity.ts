import type { PaginationEntity } from '../../pagination/entities/pagination.entity'
import type { UserEntity } from './user.entity'

export class UsersEntity {
	users: UserEntity[]
	meta: PaginationEntity
}
