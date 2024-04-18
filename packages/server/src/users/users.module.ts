import { Module } from '@nestjs/common'
import { PaginationService } from '../pagination/pagination.service'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	controllers: [UsersController],
	providers: [UsersService, PaginationService],
	exports: [UsersService],
})
export class UsersModule {}
