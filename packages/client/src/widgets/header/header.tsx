import { Path } from '@/shared/model'
import { AppBar, Box, Button, Container } from '@mui/material'
import type { FC } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Header: FC = () => {
	// const { data } = useGetAuthQuery()

	// const role = data?.user.role

	const navigate = useNavigate()

	const { pathname } = useLocation()

	function handleLogout() {
		sessionStorage.removeItem('token')
		localStorage.clear()
		navigate(0)
	}

	// useEffect(() => {
	// 	if (
	// 		!(typeof window !== 'undefined' && window.localStorage && localStorage.getItem('time')) &&
	// 		role === 'USER'
	// 	) {
	// 		localStorage.setItem('time', '0.1')
	// 	}
	// }, [role])

	return (
		<AppBar>
			<Container
				maxWidth='lg'
				sx={{
					height: 65,
					display: 'flex',
					justifyContent: 'space-between',
					flexDirection: 'unset',
					alignItems: 'center',
				}}
			>
				<Link to='/'>
					<Box
						component='div'
						sx={{
							display: 'flex',
							alignItems: 'center',
							fontSize: '18px',
							fontWeight: '700',
						}}
					>
						Логотип
					</Box>
				</Link>
				{/* {role === 'USER' && <Timer timeForTest={localStorage.getItem('time')} />} */}
				{pathname !== Path.AUTH && (
					<Box component='div' sx={{ display: 'flex' }}>
						<Box
							component='div'
							sx={{
								display: 'flex',
								width: 'fit-content',
								justifyContent: 'space-between',
							}}
						>
							<Button onClick={handleLogout} variant='contained'>
								Выход
							</Button>
						</Box>
					</Box>
				)}
			</Container>
		</AppBar>
	)
}
