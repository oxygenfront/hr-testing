import { useGetResultsTestQuery } from '@/entities/tests'
import { ShowMoreInfoResult, UserCreateModal } from '@/features/admin'
import { Loader } from '@/shared/ui'
import { Box, Button, List } from '@mui/material'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import { type FC, useReducer, useState } from 'react'

export const ListUsers: FC = () => {
	const { data, isLoading, isSuccess } = useGetResultsTestQuery()
	// const [deleteResult, { isError: isDeleteResultError, isLoading: isDeleteResultLoading }] = useDeleteResultMutation()
	const [idResult, setIdResult] = useState('')
	const [open, toggleModal] = useReducer((open) => !open, false)

	const columns: GridColDef[] = [
		{ field: 'userLogin', headerName: 'ФИО', width: 220 },
		{
			field: 'testTitle',
			headerName: 'Тест',
			type: 'string',
			width: 150,
		},
		{
			field: 'succeedPercent',
			headerName: 'Результат',
			width: 100,
		},
		{
			field: 'createdAt',
			headerName: 'Дата прохождения',
			width: 200,
		},
		{
			field: 'resultMore',
			headerName: 'Результат (расширенный)',
			width: 200,
			renderCell: (params) => (
				<Button variant='contained' onClick={() => setIdResult(params.id as string)}>
					Подробнее
				</Button>
			),
		},
		// {
		// 	field: 'deleteResult',
		// 	headerName: 'Удалить',
		// 	width: 100,
		// 	renderCell: ({ id }) => (
		// 		<IconButton onClick={() => deleteResult([id as string])}>
		// 			<Delete />
		// 		</IconButton>
		// 	),
		// },
	]

	if (isLoading || !isSuccess) {
		return <Loader />
	}
	if (!data.length) {
		return (
			<>
				<Box>Нет пользователей</Box>
				<Button variant='contained' onClick={() => toggleModal()}>
					Создать пользователя
				</Button>
				<UserCreateModal open={open} closeModal={toggleModal} />
			</>
		)
	}

	const rows = data.map((result) => ({
		...result,
		succeedPercent: `${result.testResult.succeedPercent} %`,
		createdAt: new Date(result.createdAt).toLocaleDateString('ru'),
		resultMore: null,
	}))

	return (
		<List component='div' sx={{ p: '20px 40px 0 60px', mb: '20px' }}>
			<DataGrid
				disableRowSelectionOnClick
				sx={{
					'& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
						outline: 'none',
					},
					':column-header:focus': {
						outline: 'none',
					},
					mb: '20px',
				}}
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
			/>
			<Button variant='contained' onClick={() => toggleModal()}>
				Создать пользователя
			</Button>
			<UserCreateModal open={open} closeModal={toggleModal} />
			{idResult && <ShowMoreInfoResult idResult={idResult} closeModal={() => setIdResult('')} />}
		</List>
	)
}
