import { Module } from '@nestjs/common'
import { PaginationService } from '../pagination/pagination.service'
import { QuestionsController } from './questions.controller'
import { QuestionsService } from './questions.service'

@Module({
	controllers: [QuestionsController],
	providers: [QuestionsService, PaginationService],
})
export class QuestionsModule {}
