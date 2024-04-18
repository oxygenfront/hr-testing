import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaService } from 'nestjs-prisma'
import { PrismaClientExceptionFilter } from 'nestjs-prisma'
import { AppModule } from './app.module'
import { Route } from './global/constants'
import { EnvironmentVariables } from './global/types'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	// set up base url
	app.setGlobalPrefix(Route.BASE)

	// get config include .env
	const configService = app.get(ConfigService<EnvironmentVariables>)

	// set up prisma service
	const prismaService: PrismaService = app.get(PrismaService)

	// prisma logger
	prismaService.$on('query', (event) => {
		console.info(event)
	})

	// set up global validation pipe
	app.useGlobalPipes(
		new ValidationPipe({
			enableDebugMessages: true,
			skipMissingProperties: true,
			transform: true,
		})
	)

	// create swagger config
	const config = new DocumentBuilder()
		.setTitle('Screening')
		.setDescription('Screening API description')
		.setVersion('0.1')
		.addBearerAuth()
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('swagger', app, document)

	// create adapter for custom prisma errors
	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

	const port = configService.get('PORT', { infer: true })

	await app.listen(port, () => {
		console.info(`⚡️ Server is running at https://localhost:${port}`)
	})
}
bootstrap()
