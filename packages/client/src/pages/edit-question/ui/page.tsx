import { EditQuestion } from '@/features/edit-question'
import { Typography } from '@mui/material'
import type { FC } from 'react'

export const EditQuestionPage: FC = () => {
	return (
		<>
			<Typography variant='h4' component='h1' fontWeight='700' mb={4}>
				Редактировать вопрос
			</Typography>
			<EditQuestion />
		</>
	)
}
