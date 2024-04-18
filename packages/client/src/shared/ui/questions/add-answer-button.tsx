import type { CreateQuestionSchema } from '@/shared/model'
import { Button } from '@mui/material'
import type { FC } from 'react'
import { useFormContext } from 'react-hook-form'

type AddAnswerButtonProps = {
	addAnswer: VoidFunction
}

export const AddAnswerButton: FC<AddAnswerButtonProps> = ({ addAnswer }) => {
	const { watch } = useFormContext<CreateQuestionSchema>()

	return (
		<Button
			type='button'
			variant='contained'
			disabled={watch('answers').length === 4}
			onClick={addAnswer}
			sx={{ width: '50%', borderRadius: '12px', fontWeight: '700' }}
		>
			Добавить ответ
		</Button>
	)
}
