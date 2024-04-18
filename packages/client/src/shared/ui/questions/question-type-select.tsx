import { QuestionTypeEnum } from '@/shared/model/questionsSchema'
import { CheckBox, RadioButtonChecked } from '@mui/icons-material'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const QuestionTypeSelect: FC = () => {
	const { control } = useFormContext()

	const selectQuestionTypeOptions = [
		{ type: QuestionTypeEnum.enum.radio, icon: <RadioButtonChecked />, label: 'Один из списка' },
		{ type: QuestionTypeEnum.enum.checkbox, icon: <CheckBox />, label: 'Несколько из списка' },
	]

	return (
		<FormControl required sx={{ width: '50%' }}>
			<InputLabel id='select-variant-answers'>Выберите из списка тип ответа</InputLabel>
			<Controller
				control={control}
				name='type'
				render={({ field }) => (
					<Select
						{...field}
						labelId='select-variant-answers'
						id='demo-simple-select'
						label='Выберите из списка тип ответа'
						sx={{
							'& #demo-simple-select': {
								display: 'flex',
								alignItems: 'center',
								gap: '10px',
							},
						}}
					>
						{selectQuestionTypeOptions.map(({ type, label, icon }) => (
							<MenuItem
								key={type}
								value={type}
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
								}}
							>
								{icon}
								{label}
							</MenuItem>
						))}
					</Select>
				)}
			/>
		</FormControl>
	)
}
