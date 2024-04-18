import { TextField } from '@mui/material'
import type { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const QuestionTitleTextField: FC = () => {
	const { control } = useFormContext()

	return (
		<Controller
			control={control}
			name='title'
			render={({ field, fieldState: { invalid, error } }) => (
				<TextField
					{...field}
					label={'Вопрос'}
					required
					multiline
					maxRows={5}
					error={invalid}
					placeholder='Текст вопроса'
					helperText={error?.message}
					sx={{ width: '50%' }}
				/>
			)}
		/>
	)
}
