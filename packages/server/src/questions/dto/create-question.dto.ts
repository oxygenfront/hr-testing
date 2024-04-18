import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

enum QuestionType {
	CHECKBOX = 'checkbox',
	RADIO = 'radio',
}

export class CreateAnswerDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsBoolean()
	isCorrect: boolean
}

export class CreateQuestionDto {
	@IsString()
	@IsNotEmpty()
	title: string

	@IsString()
	@IsNotEmpty()
	/**
	 * Type of answers for a question
	 * @description 'checkbox' | 'radio'
	 */
	type: QuestionType

	answers: CreateAnswerDto[]
}
