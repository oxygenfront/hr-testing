import { Body, Controller, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { Public } from '../decorators/public.decorator'
import { Route, SwaggerApiTag } from '../global/constants'
import { AuthService } from './auth.service'
import { AuthRequestDto, LoginDto, LoginRequestDto } from './dto/login.dto'
import { AuthEntity } from './entities/auth.entity'
import { LocalAuthGuard } from './local-auth.guard'

@ApiTags(SwaggerApiTag.AUTH)
@Controller(Route.AUTH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@UseGuards(LocalAuthGuard)
	@ApiBody({ type: LoginDto })
	@ApiOkResponse({ type: AuthEntity, description: 'Successful login' })
	@ApiForbiddenResponse({ description: 'Password incorrect' })
	@Post(Route.LOGIN)
	@HttpCode(200)
	login(@Req() request: LoginRequestDto, @Body() _loginDto: LoginDto) {
		return this.authService.login(request.user)
	}

	@Public()
	@UseGuards(AuthGuard('jwt'))
	@ApiOkResponse({ type: AuthEntity })
	@Get()
	auth(@Req() request: AuthRequestDto) {
		return this.authService.auth(request)
	}
}
