import { useDeleteQuestionMutation, useGetQuestionsQuery } from '@/features/admin/api'
import { Path, pagination } from '@/shared/model'
import { Loader } from '@/shared/ui'
import { ArrowBackIos, ArrowForwardIos, Delete, Edit } from '@mui/icons-material'
import { Box, Button, IconButton, List, ListItem, ListItemText } from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useReducer, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export const ListQuestions: FC = () => {
	const { enqueueSnackbar } = useSnackbar()

	const [queryParams, setQueryParams] = useReducer(pagination, { page: 1, size: 20 })

	const { data, isLoading, isError, isFetching } = useGetQuestionsQuery(queryParams)
	const [deleteQuestion, { originalArgs }] = useDeleteQuestionMutation()
	const [questionsIds, setQuestionsIds] = useState<string[]>([])

	const questions = data?.questions || []

	useEffect(() => {
		if (!isFetching) {
			setQuestionsIds((prevValue) => {
				const newIds = questions.map((item) => item.id)
				const uniqueIds = [...new Set([...prevValue, ...newIds])]
				return uniqueIds
			})
		}
	}, [isFetching, questions])

	if (isError) {
		enqueueSnackbar('Произошла ошибка при получении вопросов', { variant: 'error' })
	}

	if (isLoading) {
		return <Loader />
	}

	if (!questions.length) {
		return (
			<>
				<Box>Нет вопросов для отображения</Box>
				<Box sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', width: '100%' }}>
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
					>
						<NavLink to={Path.ADMIN_CREATE_QUESTION}>Создать вопрос</NavLink>
					</Button>
				</Box>
			</>
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
			}}
		>
			{questions.map(({ id, title }) => (
				<ListItem
					key={id}
					sx={{
						bgcolor: '#F7FAFC',
						border: '1px solid #D1D6E8',
						borderRadius: '12px',
						mb: '20px',
						p: '15px 27px',
					}}
				>
					<ListItemText primary={`${questionsIds.indexOf(id) + 1}. ${title}`} />
					<Box component='div' sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								width: '64px',
								height: '38px',
								bgcolor: '#E8EBF2',
								border: '2px solid #E8EBF2',
								borderRadius: '13px',
								':hover': {
									border: '2px solid black',
									color: 'black',
								},
							}}
						>
							<Link
								to={`${Path.ADMIN_EDIT_QUESTION}/${id}`}
								style={{
									height: '100%',
									width: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Edit />
							</Link>
						</Box>
						<Button
							disabled={originalArgs?.id === id}
							onClick={() => deleteQuestion({ id })}
							size='small'
							sx={{
								p: '5px 16px',
								bgcolor: '#E8EBF2',
								border: '2px solid #E8EBF2',
								borderRadius: '13px',
								':hover': {
									border: '2px solid red',
									color: 'red',
									bgcolor: '#F7FAFC',
								},
							}}
						>
							<Delete />
						</Button>
					</Box>
				</ListItem>
			))}
			<Box sx={{ display: 'flex', gap: '20px', justifyContent: 'flex-start', width: '100%' }}>
				<Button
					variant='contained'
					sx={{
						border: '2px solid #1A5CE5',
						bgcolor: '#1A5CE5',
						fontWeight: 600,
						// FIXME too much contrast on hover - check it with devtools
						':hover': {
							bgcolor: 'transparent',
							borderColor: '#66ff00',
							color: '#66ff00',
						},
					}}
				>
					<NavLink to={Path.ADMIN_CREATE_QUESTION}>Создать вопрос</NavLink>
				</Button>
				<Box>
					<IconButton onClick={() => setQueryParams({ type: 'PREV_PAGE' })} disabled={!data?.meta.hasPrev}>
						<ArrowBackIos />
					</IconButton>
					<IconButton
						sx={{ width: 'fit-content' }}
						onClick={() => setQueryParams({ type: 'NEXT_PAGE' })}
						disabled={!data?.meta.hasNext}
					>
						<ArrowForwardIos />
					</IconButton>
				</Box>
			</Box>
		</List>
	)
}
