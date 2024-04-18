import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppService } from './app.service'
import { Public } from './decorators/public.decorator'
import { Route, SwaggerApiTag } from './global/constants'

@Controller()
@ApiTags(SwaggerApiTag.PING)
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Public()
	@Get(Route.PING)
	getPing(): string {
		return this.appService.ping()
	}
}
