import { IsArray } from 'class-validator'

export class DeleteResultsDto {
	@IsArray()
	ids: string[]
}
