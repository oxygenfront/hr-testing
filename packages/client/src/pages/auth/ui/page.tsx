import { Form } from '@/features/auth'
import { Box } from '@mui/material'
import type { FC } from 'react'

export const Auth: FC = () => {
	return (
		<Box
			component='div'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 'calc(100vh - 101px)',
			}}
		>
			<Form />
		</Box>
	)
}
