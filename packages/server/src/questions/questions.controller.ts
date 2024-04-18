import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger'
import { Route, SwaggerApiTag } from '../global/constants'
import { Pagination } from '../pagination/dto/pagination.dto'
import { PaginationService } from '../pagination/pagination.service'
import { CreateQuestionDto } from './dto/create-question.dto'
import { DeleteQuestionDto } from './dto/delete-question.dto'
import { UpdateQuestionDto } from './dto/update-question.dto'
import { QuestionEntity } from './entities/question.entity'
import { QuestionsEntity } from './entities/questions.entity'
import { QuestionsService } from './questions.service'

@Controller(Route.QUESTIONS)
@ApiTags(SwaggerApiTag.QUESTIONS)
export class QuestionsController {
	constructor(
		private questionsService: QuestionsService,
		private paginationService: PaginationService
	) {}

	@ApiBearerAuth()
	@ApiBody({ type: CreateQuestionDto })
	@ApiCreatedResponse({ type: QuestionEntity })
	@Post(Route.CREATE)
	create(@Body() createQuestionDto: CreateQuestionDto) {
		return this.questionsService.create(createQuestionDto)
	}

	@ApiBearerAuth()
	@ApiBody({ type: CreateQuestionDto, isArray: true })
	@ApiCreatedResponse({ type: QuestionEntity, isArray: true })
	@Post(Route.CREATE_MANY)
	createMany(@Body() createQuestionDto: CreateQuestionDto[]) {
		return this.questionsService.createMany(createQuestionDto)
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: QuestionsEntity })
	@Get()
	findAll(@Query() params: Pagination) {
		return this.questionsService.findAll(params)
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: QuestionEntity })
	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string) {
		return this.questionsService.findOne(id)
	}

	@ApiBearerAuth()
	@ApiBody({ type: UpdateQuestionDto })
	@ApiOkResponse({ type: QuestionEntity })
	@Put(Route.UPDATE)
	update(@Body() updateQuestionDto: UpdateQuestionDto) {
		return this.questionsService.update(updateQuestionDto)
	}

	@ApiBearerAuth()
	@ApiBody({ type: DeleteQuestionDto })
	@ApiNoContentResponse()
	@Delete(Route.DELETE)
	@HttpCode(204)
	delete(@Body() deleteQuestionDto: DeleteQuestionDto) {
		return this.questionsService.delete(deleteQuestionDto)
	}
}
