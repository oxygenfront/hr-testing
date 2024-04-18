import { Button } from '@mui/material'
import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'

export const GoBackButton: FC = () => {
	const navigate = useNavigate()

	return (
		<Button
			type='button'
			variant='contained'
			sx={{
				width: '50%',
				borderRadius: '12px',
				fontWeight: '700',
				bgcolor: '#E8EBF2',
				color: 'black',
				':hover': {
					bgcolor: '#fff',
				},
			}}
			onClick={() => navigate(-1)}
		>
			Назад
		</Button>
	)
}
