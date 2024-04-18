import { type FC, useEffect, useRef } from 'react'

import { Answer } from '@/features/answer'
import type { IContentBlockProps } from '@/features/content-block/model'
import { Box } from '@mui/material'

export const ContentBlock: FC<IContentBlockProps> = ({ totalCountQuestions = 0, question, questionIndex, onFocus }) => {
	const questionRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (onFocus === question.id && questionRef.current) {
			questionRef.current.scrollIntoView({ behavior: 'smooth' })
			questionRef.current.focus()
		}
	}, [onFocus, question.id])

	return (
		<Box
			component='div'
			sx={{
				mb: '32px',
				scrollMarginTop: '65px',
				'& .MuiBox-root:focus': {
					outline: '2px solid black',
				},
			}}
			ref={questionRef}
		>
			<Box component='p' sx={{ fontSize: '22px', fontWeight: '700', mb: '32px', whiteSpace: 'pre' }}>
				Вопрос {questionIndex + 1} из {totalCountQuestions}: {question.title}
			</Box>
			<Box
				component='div'
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '100%',
					backgroundColor: '#F7FAFC',
					border: '1px solid #D1D6E8',
					padding: '20px 27px',
					borderRadius: '12px',
				}}
			>
				<Answer question={question} indexQuestion={questionIndex} type={question.type} />
			</Box>
		</Box>
	)
}
