import { useOnChangeInput } from '@/features/answer/lib/hooks'
import type { IAnswerProps } from '@/features/answer/model'
import { DISABLED } from '@/shared/model'
import { Checkbox, FormControlLabel, FormGroup, Radio } from '@mui/material'
import type { ChangeEvent, FC } from 'react'

export const Answer: FC<IAnswerProps> = ({ question, indexQuestion, type }) => {
	const { handleOnChangeInput, value } = useOnChangeInput({ question })
	// const { isTimerRunning } = useAppSelector(selectTimer)

	return (
		<FormGroup sx={{ height: '100%', width: '100%', pr: '32px' }}>
			{!!question.answers.length &&
				question.answers.map((item, index) => (
					<FormControlLabel
						sx={{
							display: 'flex',
							alignItems: 'center',
							fontSize: '18px',
							width: 'fit-content',
							':not(:last-child)': {
								mb: '32px',
							},
						}}
						key={`${item.title}_${index}`}
						label={item.title}
						control={
							type === 'checkbox' ? (
								<Checkbox
									sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
									checked={value.includes(item.id)}
									name={`${type} ${indexQuestion}`}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										handleOnChangeInput(item.id, e.target.type as 'checkbox')
									}
									disabled={DISABLED /* || !isTimerRunning */}
								/>
							) : (
								<Radio
									sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
									checked={value.includes(item.id)}
									name={`${type} ${indexQuestion}`}
									onChange={(e: ChangeEvent<HTMLInputElement>) =>
										handleOnChangeInput(item.id, e.target.type as 'radio')
									}
									disabled={DISABLED /* || !isTimerRunning */}
								/>
							)
						}
					/>
				))}
		</FormGroup>
	)
}
