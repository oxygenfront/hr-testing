import { Blob } from 'node:buffer'
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Res } from '@nestjs/common'
import {
	ApiBearerAuth,
	ApiBody,
	ApiCreatedResponse,
	ApiNoContentResponse,
	ApiOkResponse,
	ApiTags,
} from '@nestjs/swagger'
import type { Response } from 'express'
import { Public } from '../decorators/public.decorator'
import { Route, SwaggerApiTag } from '../global/constants'
import { CreateResultDto } from './dto/create-result.dto'
import { DeleteResultsDto } from './dto/delete-results.dto'
import { UserResultEntity } from './entities/result.entity'
import { ResultsService } from './results.service'

@Controller(Route.RESULTS)
@ApiTags(SwaggerApiTag.RESULTS)
export class ResultsController {
	constructor(private readonly resultsService: ResultsService) {}

	@Public()
	@ApiBody({ type: CreateResultDto })
	@ApiCreatedResponse({ type: UserResultEntity })
	@Post(Route.CREATE)
	create(@Body() createResultDto: CreateResultDto) {
		return this.resultsService.create(createResultDto)
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: UserResultEntity, isArray: true })
	@Get()
	findAll() {
		return this.resultsService.findAll()
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: UserResultEntity })
	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string) {
		return this.resultsService.findOne(id)
	}

	@ApiBearerAuth()
	@ApiBody({ type: DeleteResultsDto })
	@ApiNoContentResponse()
	@Delete(Route.DELETE)
	@HttpCode(204)
	delete(@Body() deleteResultsDto: DeleteResultsDto) {
		return this.resultsService.delete(deleteResultsDto)
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: Blob })
	@Get(Route.REPORT_BY_ID)
	createReportFile(@Res() res: Response, @Param('id') id: string) {
		return this.resultsService.createReportFile(res, id)
	}
}
