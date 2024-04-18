import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class SelectedOption {
	@IsString()
	@IsNotEmpty()
	questionId: string

	@IsArray()
	answersIds: string[]
}

export class CreateResultDto {
	@IsString()
	@IsNotEmpty()
	userId: string

	@IsString()
	@IsNotEmpty()
	testId: string

	@IsArray()
	selectedOptions: SelectedOption[]
}
