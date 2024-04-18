import type { ContentBlockAdminProps } from '@/widgets/content-block-admin/model'
import { Box, FormGroup } from '@mui/material'
import { type FC, useState } from 'react'
import { Answer } from './answer'
export const ContentBlockAdmin: FC<ContentBlockAdminProps> = ({ question, testResult }) => {
	const [wrongAnswer, setWrongAnswer] = useState<boolean>(false)
	// red bg rgba(255, 0, 0,.5)
	const selectedAnswers: string[] = []
	const correctAnswers: string[] = []
	for (const item of [...testResult.failedAnswers, ...testResult.succeedAnswers]) {
		selectedAnswers.push(...item.selectedAnswers)
		if (item.correctAnswers) {
			correctAnswers.push(...item.correctAnswers)
		} else {
			correctAnswers.push(...item.selectedAnswers)
		}
	}

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
		>
			<Box
				component='p'
				sx={{
					fontSize: '22px',
					fontWeight: '700',
					mb: '32px',
					whiteSpace: 'pre',
					color: wrongAnswer ? 'red' : 'green',
				}}
			>
				{question.title}
			</Box>
			<Box
				component='div'
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					height: '100%',
					backgroundColor: wrongAnswer ? 'rgba(255, 0, 0,.06)' : 'rgba(0, 255, 0, .06)',
					border: '1px solid #D1D6E8',
					padding: '20px 27px',
					borderRadius: '12px',
				}}
			>
				<FormGroup>
					{!!question.answers.length &&
						question.answers.map((answer, index) => (
							<Answer
								key={`${answer.title}_${index}`}
								answer={answer}
								type={question.type}
								correctAnswers={correctAnswers}
								selectedAnswers={selectedAnswers}
								setWrongAnswer={setWrongAnswer}
							/>
						))}
				</FormGroup>
			</Box>
		</Box>
	)
}
