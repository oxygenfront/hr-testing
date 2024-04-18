import type { CreateQuestionSchema, UpdateQuestionSchema } from '@/shared/model'
import { List, RadioGroup } from '@mui/material'
import type { ChangeEvent, FC } from 'react'
import {
	Controller,
	type FieldArrayWithId,
	type UseFieldArrayRemove,
	type UseFieldArrayUpdate,
	useFormContext,
} from 'react-hook-form'
import { AnswersListItem } from './answers-list-item'

interface AnswersListProps {
	fields: FieldArrayWithId<CreateQuestionSchema | UpdateQuestionSchema, 'answers', 'id'>[]
	remove: UseFieldArrayRemove
	update: UseFieldArrayUpdate<CreateQuestionSchema, 'answers'>
}

export const AnswersList: FC<AnswersListProps> = ({ fields, remove, update }) => {
	const { control, watch } = useFormContext<CreateQuestionSchema>()

	const questionType = watch('type')

	const listStyle = { width: '100%', mb: 3 }

	const lists = {
		checkbox: () => {
			return fields.map((field, index) => (
				<AnswersListItem
					key={field.id}
					remove={remove}
					index={index}
					disabled={fields.length === 1}
					isCorrect={field.isCorrect}
				/>
			))
		},
		radio: () => {
			return (
				<Controller
					control={control}
					name='answers'
					render={({ field }) => {
						const { onChange, ...rest } = field

						const handleChange = (_event: ChangeEvent<HTMLInputElement>, value: string) => {
							const answers = watch('answers')

							const newValues = answers.map((item, index) => {
								update(index, { ...item, isCorrect: index === +value })
								return { ...item, isCorrect: index === +value }
							})

							onChange(newValues)
						}

						return (
							<RadioGroup {...rest} onChange={handleChange}>
								{fields.map((field, index) => (
									<AnswersListItem
										key={field.id}
										remove={remove}
										index={index}
										disabled={fields.length === 1}
										isCorrect={field.isCorrect}
									/>
								))}
							</RadioGroup>
						)
					}}
				/>
			)
		},
	}

	return <List sx={listStyle}>{lists[questionType]()}</List>
}
