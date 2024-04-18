import { Box, CircularProgress } from '@mui/material'
import type { FC } from 'react'

export const Loader: FC = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	)
}
