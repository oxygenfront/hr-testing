import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common'
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
import { CreateTestDto } from './dto/create-test.dto'
import { DeleteTestDto } from './dto/delete-test.dto'
import { UpdateTestDto } from './dto/update-test.dto'
import { TestEntity } from './entities/test.entity'
import { TestsService } from './tests.service'

@Controller(Route.TESTS)
@ApiTags(SwaggerApiTag.TESTS)
export class TestsController {
	constructor(private readonly testsService: TestsService) {}

	@ApiBearerAuth()
	@ApiBody({ type: CreateTestDto })
	@ApiCreatedResponse({ type: TestEntity })
	@Post(Route.CREATE)
	create(@Body() createTestDto: CreateTestDto) {
		return this.testsService.create(createTestDto)
	}

	@ApiBearerAuth()
	@ApiOkResponse({ type: TestEntity, isArray: true })
	@Get()
	findAll() {
		return this.testsService.findAll()
	}

	@Public()
	@ApiOkResponse({ type: TestEntity })
	@Get(Route.GET_BY_ID)
	findOne(@Param('id') id: string) {
		return this.testsService.findOne(id)
	}

	@ApiBearerAuth()
	@ApiBody({ type: UpdateTestDto })
	@ApiOkResponse({ type: TestEntity })
	@Put(Route.UPDATE)
	update(@Body() updateTestDto: UpdateTestDto) {
		return this.testsService.update(updateTestDto)
	}

	@ApiBearerAuth()
	@ApiBody({ type: DeleteTestDto })
	@ApiNoContentResponse()
	@Delete(Route.DELETE)
	@HttpCode(204)
	delete(@Body() deleteTestDto: DeleteTestDto) {
		return this.testsService.delete(deleteTestDto)
	}
}
