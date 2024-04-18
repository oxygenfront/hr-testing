import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { PrismaService } from 'nestjs-prisma'
import { UserEntity } from 'src/users/entities/user.entity'
import type { AuthRequestDto } from './dto/login.dto'
import type { AuthEntity } from './entities/auth.entity'

@Injectable()
export class AuthService {
	constructor(
		private prisma: PrismaService,
		private jwtService: JwtService
	) {}

	async validateUser(login: string, password: string): Promise<User> {
		const user = await this.prisma.user.findUnique({
			where: {
				login,
			},
		})

		if (!user) {
			throw new NotFoundException(`No user found for login: ${login}`)
		}

		const isCorrectPassword = await compare(password, user.password)

		if (!isCorrectPassword) {
			throw new ForbiddenException('Password incorrect')
		}

		return user
	}

	login({ login, id }: User): AuthEntity {
		const payload = { login, sub: id }

		return {
			accessToken: this.jwtService.sign(payload),
		}
	}

	async auth(request: AuthRequestDto) {
		const id = request.user.userId

		const user = await this.prisma.user.findUnique({
			where: { id },
		})

		if (!user) {
			throw new NotFoundException('No user found')
		}

		return {
			user: new UserEntity(user),
		}
	}
}
