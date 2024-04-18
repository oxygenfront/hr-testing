import { Module } from '@nestjs/common'
import { PaginationService } from '../pagination/pagination.service'
import { QuestionsService } from '../questions/questions.service'
import { TestsController } from './tests.controller'
import { TestsService } from './tests.service'

@Module({
	controllers: [TestsController],
	providers: [TestsService, QuestionsService, PaginationService],
})
export class TestsModule {}
