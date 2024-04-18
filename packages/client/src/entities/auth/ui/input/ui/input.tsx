import { TextField } from '@mui/material'
import { Controller, type FieldValues } from 'react-hook-form'
import type { IInputProps } from '../model'

export const Input = <TFieldValues extends FieldValues>({ control, name, ...rest }: IInputProps<TFieldValues>) => (
	<Controller
		name={name}
		control={control}
		render={({ field, fieldState: { invalid, error } }) => (
			<TextField error={invalid} helperText={error?.message} {...field} {...rest} />
		)}
	/>
)
