import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Public } from '../decorators/public.decorator'
import { Route, SwaggerApiTag } from '../global/constants'
import type { Pagination } from '../pagination/dto/pagination.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { SignupUserEntity, UserEntity } from './entities/user.entity'
import { UsersEntity } from './entities/users.entity'
import { UsersService } from './users.service'

@Controller(Route.USERS)
@ApiTags(SwaggerApiTag.USERS)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Public()
	@ApiBody({ type: CreateUserDto })
	@ApiCreatedResponse({ type: SignupUserEntity })
	@Post(Route.SIGNUP)
	async signup(@Body() createUserDto: CreateUserDto) {
		return new SignupUserEntity(await this.usersService.signup(createUserDto))
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: UsersEntity })
	@Get()
	async findAll(@Query() params: Pagination) {
		return await this.usersService.findAll(params)
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: UserEntity })
	@Get(Route.GET_BY_ID)
	async findOne(@Param('id') id: string) {
		return new UserEntity(await this.usersService.findOne(id))
	}

	@ApiBearerAuth()
	@ApiNoContentResponse()
	@Delete(Route.DELETE_BY_ID)
	@HttpCode(204)
	delete(@Param('id') id: string) {
		return this.usersService.delete(id)
	}
}
