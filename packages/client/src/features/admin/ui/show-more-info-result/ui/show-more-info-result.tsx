import { useGetResultByIdQuery, useGetTestByIdQuery } from '@/entities/tests'
import { useLazyGetResultReportByIdQuery } from '@/entities/tests/api/testsApi'
import type { ITestResult } from '@/shared/model'
import { Loader } from '@/shared/ui'
import { ContentBlockAdmin } from '@/widgets/content-block-admin'
import { Box, Button, Modal, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import type { FC } from 'react'

interface IShowMoreInfoResultProps {
	idResult: string
	closeModal: () => void
}

export const ShowMoreInfoResult: FC<IShowMoreInfoResultProps> = ({ idResult, closeModal }) => {
	const { enqueueSnackbar } = useSnackbar()

	const {
		data: getResultsData,
		isError: getResultsIsError,
		isLoading: getResultsIsLoading,
	} = useGetResultByIdQuery(idResult)

	const {
		data: getTestData,
		isError: getTestIsError,
		isLoading: getTestIsLoading,
	} = useGetTestByIdQuery(getResultsData?.testId, { skip: !getResultsData?.testId })

	const [getReport] = useLazyGetResultReportByIdQuery()

	if (getResultsIsLoading || getTestIsLoading) {
		return <Loader />
	}

	if (getResultsIsError) {
		enqueueSnackbar('Произошла ошибка при получении результата', { variant: 'error' })
		return null
	}

	if (getTestIsError) {
		enqueueSnackbar('Произошла ошибка при получении теста', { variant: 'error' })
		return null
	}

	const { userLogin, createdAt, testResult, testTitle } = getResultsData as ITestResult

	const handleDownloadReport = () => {
		if (idResult) {
			getReport(idResult)
		}
	}

	const style = {
		padding: '6px',
		bgcolor: '#F7FAFC',
		border: '2px solid #E8EBF2',
		borderRadius: '5px',
		fontWeight: 'bold',
	}

	return (
		<Modal open={!!idResult} onClose={closeModal}>
			<Box
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					width: '95vw',
					height: '95vh',
					bgcolor: 'background.paper',
					boxShadow: 24,
					borderRadius: '10px',
					p: 4,
					pb: 15,
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
					fontSize: '24px',
					overflow: 'hidden',
				}}
			>
				<Typography textAlign='center' variant='h3' fontWeight='600' marginBottom='20px'>
					Информация о результате пользователя
				</Typography>
				<Box display='flex' justifyContent='space-around' height='100%'>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
						<Typography
							variant='h5'
							fontWeight='600'
							sx={{ color: testResult.succeedPercent < 50 ? 'red' : 'green', textAlign: 'center' }}
						>
							{testResult.succeedPercent < 50 ? 'Не справился' : 'Справился'}
						</Typography>
						<Box>
							Имя пользователя{' '}
							<Box component='span' sx={style}>
								{userLogin.trim()}
							</Box>
						</Box>
						<Box>
							Дата прохождения теста{' '}
							<Box component='span' sx={style}>
								{new Date(createdAt).toLocaleDateString('ru')}
							</Box>
						</Box>
						<Box>
							Тест{' '}
							<Box component='span' sx={style}>
								{testTitle}
							</Box>
						</Box>
						<Box>
							Пользователь успешно ответил на{' '}
							<Box component='span' sx={{ color: testResult.succeedPercent < 50 ? 'red' : 'green' }}>
								{testResult.succeedPercent}%{' '}
							</Box>
							вопросов
						</Box>
						<Button type='button' variant='contained' onClick={handleDownloadReport} sx={{ width: '50%' }}>
							Скачать pdf отчет
						</Button>
					</Box>

					<Box sx={{ overflowY: 'auto', height: '100%', width: '50%' }}>
						{getTestData?.questions.length &&
							getTestData.questions.map((item) => (
								<ContentBlockAdmin key={item.id} question={item} testResult={testResult} />
							))}
					</Box>
				</Box>
			</Box>
		</Modal>
	)
}
