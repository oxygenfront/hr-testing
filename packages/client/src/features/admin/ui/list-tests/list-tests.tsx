import { ListItemTest } from '@/entities/tests'
import { Loader } from '@/shared/ui'
import { Box, Button, ButtonGroup, List, Typography } from '@mui/material'
import { type FC, Fragment } from 'react'
import { useListTest } from './hooks'

interface IListTests {
	state: {
		handleOpenModalTest: (id: string) => void
		valueSelected: string
	}
}

export const ListTests: FC<IListTests> = ({ state }) => {
	const {
		data,
		isSuccess,
		isLoading,
		handleOpenModal,
		isSelected,
		handleCreateTest,
		isFetching,
		isLoadingCreateTest,
	} = useListTest({
		state,
	})

	const tests = data || []

	if (isLoading || !isSuccess) {
		return <Loader />
	}
	if (!tests.length) {
		return (
			<Typography
				component='p'
				sx={{
					textAlign: 'center',
					mb: '30px',
					fontWeight: 700,
				}}
			>
				Нет доступных тестов
			</Typography>
		)
	}

	return (
		<List
			component='div'
			disablePadding={true}
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexDirection: 'column',
				p: '20px 40px 0 60px',
				mb: '20px',
			}}
		>
			{tests?.map(({ id, title, questions }, index) => (
				<Fragment key={id}>
					<ListItemTest
						index={index}
						isFetching={isFetching}
						test={{ id, title, questions }}
						isSelected={isSelected === id}
						handleOpenModal={handleOpenModal}
					/>
					{isLoadingCreateTest ? <Loader /> : null}
				</Fragment>
			))}
			{
				<ButtonGroup sx={{ width: '100%', display: 'flex', gap: '20px' }}>
					<Button
						variant='contained'
						sx={{
							border: '2px solid #1A5CE5',
							bgcolor: '#1A5CE5',
							fontWeight: 600,
							':hover': {
								bgcolor: 'transparent',
								borderColor: '#66ff00',
								color: '#66ff00',
							},
						}}
						disabled={isLoadingCreateTest}
						onClick={handleCreateTest}
					>
						{isLoadingCreateTest ? 'Создание теста' : 'Создать тест'}
					</Button>
				</ButtonGroup>
			}
			<Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }} />
		</List>
	)
}
