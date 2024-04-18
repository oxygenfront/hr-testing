import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Role, type User } from '@prisma/client'
import { Exclude } from 'class-transformer'

export class UserEntity implements User {
	constructor(partial: Partial<UserEntity>) {
		Object.assign(this, partial)
	}

	id: string
	login: string
	fullName: string
	testId: string

	@ApiProperty({ enum: Object.keys(Role) })
	role: Role

	@ApiHideProperty()
	@Exclude()
	password: string

	@ApiHideProperty()
	@Exclude()
	createdAt: Date

	@ApiHideProperty()
	@Exclude()
	updatedAt: Date
}

export class SignupUserEntity extends UserEntity {
	accessToken?: string
}
