import { useGetTestByIdQuery, useUpdateTestMutation } from '@/entities/tests'
import { useGetQuestionsQuery } from '@/features/admin/api'
import { Path, pagination } from '@/shared/model'
import { Loader } from '@/shared/ui'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControlLabel, IconButton, List, Modal } from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useReducer, useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { ListModalProps } from './listModalTypes'

export const ListModal: FC<ListModalProps> = ({ selectedTestId, openModal, setOpenModal }) => {
	const [queryParams, setQueryParams] = useReducer(pagination, { page: 1, size: 5 })
	const { enqueueSnackbar } = useSnackbar()
	const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])

	// Запросы
	const {
		data: testResponse,
		isLoading: isLoadingTestById,
		isError: isErrorGetTestById,
		isFetching: isFetchingGetTestById,
	} = useGetTestByIdQuery(selectedTestId)
	const [updateTest, { isLoading: isLoadingUpdate }] = useUpdateTestMutation()
	const {
		data: questionsResponse,
		isLoading: isLoadingQuestions,
		isError: isErrorGetQuestions,
		isFetching,
	} = useGetQuestionsQuery(queryParams)

	useEffect(() => {
		testResponse && setSelectedQuestions(testResponse.questions?.map((item) => item.id))
	}, [testResponse])

	useEffect(() => {
		if (isErrorGetTestById) {
			enqueueSnackbar('Произошла ошибка при получении теста', { variant: 'error' })
		}
		if (isErrorGetQuestions) {
			enqueueSnackbar('Произошла ошибка при получении вопросов', { variant: 'error' })
		}
	}, [isErrorGetTestById, isErrorGetQuestions, enqueueSnackbar])

	const handleSelectQuestion = (itemId: string) => {
		if (testResponse) {
			if (selectedQuestions?.includes(itemId)) {
				setSelectedQuestions(selectedQuestions.filter((val) => val !== itemId))
			} else {
				setSelectedQuestions((prevValue) => [...prevValue, itemId])
			}
		}
	}

	const handleSubmit = () => {
		if (testResponse) {
			updateTest({
				id: selectedTestId,
				questionsIds: selectedQuestions,
				title: testResponse.title,
			})
			enqueueSnackbar(`Тест ${testResponse?.title} обновлен`, { variant: 'success' })
		}
	}

	function arraysEqual(arr1: string[], arr2: string[]) {
		if (arr1.length !== arr2.length) {
			return false
		}

		const sortedArr1 = arr1.slice().sort()
		const sortedArr2 = arr2.slice().sort()

		return sortedArr1.every((value, index) => value === sortedArr2[index])
	}

	return (
		<>
			<Modal open={openModal} onClose={() => setOpenModal(false)}>
				{testResponse && !isLoadingTestById && !isLoadingQuestions ? (
					<List
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							bgcolor: 'background.paper',
							boxShadow: 24,
							borderRadius: '10px',
							p: 4,
						}}
					>
						{questionsResponse?.questions.map(({ id, title }) => (
							<FormControlLabel
								key={id}
								sx={{
									display: 'flex',
									alignItems: 'center',
									fontSize: '18px',
									width: 'fit-content',
									':not(:last-child)': {
										mb: '32px',
									},
								}}
								label={title}
								control={
									<Checkbox
										sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
										checked={selectedQuestions.includes(id)}
										onChange={() => handleSelectQuestion(id)}
									/>
								}
							/>
						))}
						<Box sx={{ display: 'flex', justifyContent: 'center', mb: '30px', gap: '10px' }}>
							<IconButton
								onClick={() => setQueryParams({ type: 'PREV_PAGE' })}
								disabled={!questionsResponse?.meta.hasPrev || isFetching}
							>
								<ArrowBackIos />
							</IconButton>
							<IconButton
								sx={{ width: 'fit-content' }}
								onClick={() => setQueryParams({ type: 'NEXT_PAGE' })}
								disabled={!questionsResponse?.meta.hasNext || isFetching}
							>
								<ArrowForwardIos />
							</IconButton>
						</Box>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Button
								variant='contained'
								onClick={handleSubmit}
								disabled={
									isLoadingUpdate ||
									arraysEqual(
										testResponse.questions.map((item) => item.id),
										selectedQuestions
									) ||
									isFetchingGetTestById
								}
							>
								Подтвердить
							</Button>
							<Button variant='contained'>
								<NavLink to={Path.ADMIN_CREATE_QUESTION}>Создать вопрос</NavLink>
							</Button>
						</Box>
					</List>
				) : (
					<Loader />
				)}
			</Modal>
		</>
	)
}
