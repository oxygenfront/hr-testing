import { Injectable } from '@nestjs/common'

import { User } from '@prisma/client'

import { genSalt, hash } from 'bcryptjs'

import { PrismaService } from 'nestjs-prisma'
import type { Pagination } from '../pagination/dto/pagination.dto'
import { PaginationService } from '../pagination/pagination.service'
import type { CreateUserDto } from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'

export const roundsOfHashing = 10

@Injectable()
export class UsersService {
	constructor(
		private prisma: PrismaService,
		private pagination: PaginationService
	) {}

	async signup(createUserDto: CreateUserDto) {
		const { isAdmin, login, password, fullName, testId } = createUserDto

		const salt = await genSalt(roundsOfHashing)
		const hashedPassword = await hash(password, salt)

		const newUser = await this.prisma.user.create({
			data: {
				login: login,
				password: hashedPassword,
				fullName,
				role: isAdmin ? 'ADMIN' : 'USER',
				testId,
			},
		})

		return this.createUSerEntity(newUser)
	}

	async findAll(params: Pagination) {
		const { page, size } = params

		const totalCount = await this.prisma.user.count()

		const { skip, take, hasNext, hasPrev } = this.pagination.getPaginationParams({
			page,
			size,
			totalCount,
		})

		const users = await this.prisma.user.findMany({
			skip,
			take,
			select: {
				id: true,
				login: true,
				fullName: true,
				role: true,
			},
			orderBy: {
				updatedAt: 'asc',
			},
		})

		return { users, meta: { totalCount, hasNext, hasPrev } }
	}

	findOne(id: string) {
		return this.prisma.user.findUnique({
			where: { id },
		})
	}

	delete(id: string) {
		return this.prisma.user.delete({
			where: { id },
		})
	}

	createUSerEntity(user: User) {
		return new UserEntity(user)
	}
}
