import { Header } from '@/widgets/header'
import { Container } from '@mui/material'
import type { FC } from 'react'
import { Outlet } from 'react-router-dom'

export const Layout: FC = () => {
	return (
		<>
			<Header />
			<Container maxWidth='lg' sx={{ my: '101px' }}>
				<Outlet />
			</Container>
		</>
	)
}
