import { CreateQuestion } from '@/features/create-question'
import { Typography } from '@mui/material'
import type { FC } from 'react'

export const CreateQuestionPage: FC = () => {
	return (
		<>
			<Typography variant='h4' component='h1' fontWeight='700' mb={4}>
				Создать вопрос
			</Typography>
			<CreateQuestion />
		</>
	)
}
