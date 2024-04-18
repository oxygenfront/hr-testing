import type { PaginationEntity } from '../../pagination/entities/pagination.entity'
import type { QuestionEntity } from './question.entity'

export class QuestionsEntity {
	questions: QuestionEntity[]
	meta: PaginationEntity
}
