import type { CreateQuestionSchema } from '@/shared/model'
import { QuestionTypeEnum } from '@/shared/model/questionsSchema'
import { Delete } from '@mui/icons-material'
import {
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	IconButton,
	InputBase,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Radio,
} from '@mui/material'
import type { FC } from 'react'
import { Controller, type UseFieldArrayRemove, useFormContext } from 'react-hook-form'

interface AnswersListItemProps {
	remove: UseFieldArrayRemove
	index: number
	disabled: boolean
	isCorrect: boolean
}

export const AnswersListItem: FC<AnswersListItemProps> = ({ remove, index, disabled, isCorrect }) => {
	const {
		control,
		formState: { errors },
		watch,
	} = useFormContext<CreateQuestionSchema>()

	const questionType = watch('type')

	return (
		<>
			<ListItem
				disablePadding
				dense
				secondaryAction={
					<IconButton edge='end' onClick={() => remove(index)} disabled={disabled}>
						<Delete />
					</IconButton>
				}
			>
				<ListItemButton disableRipple>
					<ListItemIcon>
						{questionType === QuestionTypeEnum.enum.checkbox ? (
							<Controller
								control={control}
								name={`answers.${index}.isCorrect`}
								render={({ field }) => (
									<Checkbox {...field} defaultChecked={isCorrect} tabIndex={-1} edge='start' />
								)}
							/>
						) : (
							<FormControlLabel value={index} control={<Radio checked={isCorrect} />} label='' />
						)}
					</ListItemIcon>
					<Controller
						control={control}
						name={`answers.${index}.title`}
						render={({ field, fieldState: { invalid } }) => (
							<FormControl variant='standard' sx={{ width: '100%' }}>
								<InputBase {...field} error={invalid} placeholder='Текст ответа' fullWidth />
							</FormControl>
						)}
					/>
				</ListItemButton>
			</ListItem>
			{errors.answers?.[index]?.title?.message && (
				<FormHelperText sx={{ padding: '0 16px' }} error>
					{errors.answers[index]?.title?.message}
				</FormHelperText>
			)}
		</>
	)
}
