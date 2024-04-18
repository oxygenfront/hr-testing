import { OmitType, PartialType } from '@nestjs/swagger'
import { CreateAnswerDto, CreateQuestionDto } from './create-question.dto'

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
	id: string
	title: string
}

export class UpdateQuestionDto extends PartialType(OmitType(CreateQuestionDto, ['answers'])) {
	id: string
	answers?: UpdateAnswerDto[]
}
