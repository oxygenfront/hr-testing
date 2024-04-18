import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	login: string

	@IsString()
	@IsNotEmpty()
	password: string

	@IsString()
	fullName: string

	@IsBoolean()
	@IsNotEmpty()
	isAdmin: boolean

	@IsString()
	testId?: string
}
