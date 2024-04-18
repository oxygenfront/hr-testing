import { User } from '@prisma/client'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginRequestDto extends Request {
	user: User
}

export class LoginDto {
	@IsString()
	@IsNotEmpty()
	login: string

	@IsString()
	@IsNotEmpty()
	password: string
}

class AuthUserDto {
	@IsString()
	@IsNotEmpty()
	login: string

	@IsString()
	fullName: string

	@IsString()
	@IsNotEmpty()
	userId: string
}

export class AuthRequestDto extends Request {
	user: AuthUserDto
}
