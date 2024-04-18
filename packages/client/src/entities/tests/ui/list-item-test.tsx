import { useDeleteTestMutation, useUpdateTestMutation } from '@/entities/tests'
import type { ITestResponse } from '@/shared/model'
import { Check, Delete } from '@mui/icons-material'
import { Box, Button, IconButton, ListItem, TextField } from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useState } from 'react'

interface IListItemTestProps {
	test: ITestResponse
	index: number
	isSelected: boolean
	handleOpenModal: (id: string) => void
	isFetching: boolean
}

export const ListItemTest: FC<IListItemTestProps> = ({ test, handleOpenModal, index, isFetching }) => {
	const { id, title, questions } = test
	const { enqueueSnackbar } = useSnackbar()
	// const [timer, setTimer] = useState('')
	const [titleTest, setTitleTest] = useState(title || '')
	const [updateTest, { isError: isErrorUpdateTest, isLoading: isLoadingUpdateTest, isSuccess: isSuccessUpdateTest }] =
		useUpdateTestMutation()
	const [
		deleteTest,
		{ originalArgs, isError: isErrorDeleteTest, isLoading: isLoadingDeleteTest, isSuccess: isSuccessDeleteTest },
	] = useDeleteTestMutation()

	function handleUpdateTest() {
		if (title !== titleTest) {
			updateTest({
				questionsIds: questions.map((item) => item.id),
				title: titleTest,
				id: id,
			})
		}
	}

	useEffect(() => {
		switch (true) {
			case isSuccessDeleteTest:
			case isSuccessUpdateTest: {
				enqueueSnackbar(`Тест ${title} успешно ${isSuccessUpdateTest ? 'обновлен' : 'удален'}`, {
					variant: 'success',
				})
				break
			}
			case isErrorDeleteTest:
			case isErrorUpdateTest: {
				enqueueSnackbar(
					`При ${isErrorUpdateTest ? 'обновлении' : 'удалении'} теста ${title} произошла ошибка`,
					{ variant: 'error' }
				)
				break
			}
			default:
				break
		}
	}, [isSuccessUpdateTest, isErrorUpdateTest, isErrorDeleteTest, isSuccessDeleteTest, title, enqueueSnackbar])

	return (
		<ListItem
			key={id}
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				bgcolor: '#F7FAFC',
				border: '1px solid #D1D6E8',
				borderRadius: '12px',
				mb: '20px',
				p: '15px 27px',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
				<TextField
					placeholder={`${index + 1}. ${title.charAt(0).toUpperCase() + title.slice(1) || `Тест ${index}`}`}
					sx={{ width: 'fit-content' }}
					value={titleTest}
					onChange={(e) => setTitleTest(e.target.value)}
					onBlur={handleUpdateTest}
					size='small'
				/>
				<Button
					onClick={handleUpdateTest}
					color={title !== titleTest ? 'success' : 'inherit'}
					disabled={title === titleTest || isLoadingUpdateTest || isFetching}
					variant='contained'
					size='small'
					sx={{
						minWidth: '40px',
						height: '40px',
						borderRadius: '50%',
						p: 0,
					}}
				>
					<Check />
				</Button>
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
				{/* <Typography>Введите кол-во минут на тест </Typography> */}
				{/* <TextField
					name='m'
					type='text'
					value={timer}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setTimer(e.target.value)}
					sx={{ width: '50px' }}
				/> */}
			</Box>
			<Box component='div' sx={{ display: 'flex', gap: '20px' }}>
				<Button
					size='small'
					sx={{
						color: 'white',
						bgcolor: '#1A5CE5',
						p: '5px 16px',
						border: '2px solid #1A5CE5',
						borderRadius: '13px',
						':hover': {
							color: 'black',
							bgcolor: '#E8EBF2',
						},
					}}
					onClick={() => handleOpenModal(id)}
				>
					Выбрать вопросы для теста
				</Button>
				<IconButton
					onClick={() => deleteTest({ id })}
					disabled={originalArgs?.id === id || isLoadingDeleteTest}
				>
					<Delete />
				</IconButton>
			</Box>
		</ListItem>
	)
}
