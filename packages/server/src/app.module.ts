import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { PaginationModule } from './pagination/pagination.module'
import { QuestionsModule } from './questions/questions.module'
import { ResultsModule } from './results/results.module'
import { TestsModule } from './tests/tests.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
			expandVariables: true,
		}),
		PrismaModule.forRoot({
			isGlobal: true,
			prismaServiceOptions: {
				explicitConnect: true,
				middlewares: [loggingMiddleware()],
				prismaOptions: {
					log: [
						{
							emit: 'event',
							level: 'query',
						},
					],
				},
			},
		}),
		QuestionsModule,
		UsersModule,
		AuthModule,
		PaginationModule,
		TestsModule,
		ResultsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard,
		},
	],
})
export class AppModule {}
