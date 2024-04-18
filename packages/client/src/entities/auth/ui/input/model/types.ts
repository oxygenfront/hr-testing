import type { TextFieldProps } from '@mui/material'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

export interface IInputProps<TFieldValues extends FieldValues = FieldValues>
	extends Omit<TextFieldProps, 'variant' | 'ref'> {
	control: Control<TFieldValues, unknown>
	name: FieldPath<TFieldValues>
}
