import { IsArray, IsString } from 'class-validator'

export class CreateTestDto {
	@IsString()
	title?: string

	@IsArray()
	questionsIds: string[]
}
