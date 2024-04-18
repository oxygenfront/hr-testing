import type { IAnswerProps } from '@/widgets/content-block-admin/model'
import { Checkbox, FormControlLabel, Radio } from '@mui/material'
import { type FC, useEffect, useState } from 'react'

export const Answer: FC<IAnswerProps> = ({ type, correctAnswers, selectedAnswers, answer, setWrongAnswer }) => {
	const [color, setColor] = useState<string>()
	//biome-ignore lint/correctness/useExhaustiveDependencies:
	useEffect(() => {
		if (correctAnswers.includes(answer.id)) {
			setColor('#2e7d32')
		} else if (selectedAnswers.includes(answer.id) && !correctAnswers.includes(answer.id)) {
			setColor('#d32f2f')
			setWrongAnswer(true)
		} else {
			setColor('-moz-initial')
		}
	}, [answer.id])

	return (
		<FormControlLabel
			sx={{
				display: 'flex',
				alignItems: 'center',
				fontSize: '18px',
				width: 'fit-content',
				cursor: 'default',
				':not(:last-child)': {
					mb: '32px',
				},
				'& .MuiCheckbox-root, & .MuiTypography-root, & .MuiRadio-root': {
					color: color,
					cursor: 'default',
				},
			}}
			label={answer.title}
			control={
				type === 'checkbox' ? (
					<Checkbox
						sx={{
							'& .MuiSvgIcon-root': { fontSize: 28 },
						}}
						color={correctAnswers.includes(answer.id) ? 'success' : 'error'}
						checked={selectedAnswers.includes(answer.id)}
						name={`${type}_${answer.id}`}
						aria-disabled
						disableRipple
					/>
				) : (
					<Radio
						sx={{
							'& .MuiSvgIcon-root': { fontSize: 28 },
						}}
						checked={selectedAnswers.includes(answer.id)}
						color={correctAnswers.includes(answer.id) ? 'success' : 'error'}
						name={`${type}_${answer.id}`}
						aria-disabled
						disableRipple
					/>
				)
			}
		/>
	)
}
