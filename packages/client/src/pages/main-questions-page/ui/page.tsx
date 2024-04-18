import { useGetAuthQuery } from '@/entities/auth'
import { selectStorage } from '@/entities/storage'
import { useCreateResultTestMutation, useGetTestByIdQuery } from '@/entities/tests'
import { ContentBlock } from '@/features/content-block'
import { useAppSelector } from '@/shared/lib'
import { DISABLED } from '@/shared/model'
import { Loader, ModalSuccess } from '@/shared/ui'
import { Box, Button, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useState } from 'react'

export const MainQuestionsPage: FC = () => {
	const { enqueueSnackbar } = useSnackbar()
	const { storage } = useAppSelector(selectStorage)
	const [openSuccessModal, setOpenSuccessModal] = useState(false)
	const [notAnswered, setNotAnswered] = useState<string[]>([])
	const [
		createResultTest,
		{ isSuccess: isSuccessCreateResult, isError: isErrorCreateResult, isLoading: isLoadingCreateResult },
	] = useCreateResultTestMutation()

	const { userId, testId, isUserInfoLoading } = useGetAuthQuery(undefined, {
		selectFromResult: ({ data, isLoading, isSuccess }) => ({
			userId: data?.user.id,
			testId: data?.user.testId,
			isUserInfoLoading: isLoading,
			isSuccessGetUserInfo: isSuccess,
		}),
	})
	const {
		isError: isErrorGetTestById,
		isSuccess: isSuccessGetTest,
		isLoading: isTestLoading,
		data: testResponse,
	} = useGetTestByIdQuery(testId, { skip: !testId })

	useEffect(() => {
		switch (true) {
			case isErrorGetTestById: {
				enqueueSnackbar('Произошла ошибка при получении теста', { variant: 'error' })
				break
			}
			case isErrorCreateResult: {
				enqueueSnackbar('Произошла ошибка при создании результата', { variant: 'error' })
				break
			}

			default:
				break
		}
	}, [isErrorGetTestById, isErrorCreateResult, enqueueSnackbar])

	const totalCount = testResponse?.questions.length

	function handleConfirm() {
		if (!(userId && testResponse?.id)) {
			return
		}

		const selectedOptions = Object.entries(storage).map(([key, value]) => ({
			questionId: key,
			answersIds: value,
		}))

		if (Object.keys(storage).length === totalCount) {
			setOpenSuccessModal(true)
			createResultTest({
				selectedOptions,
				userId,
				testId: testResponse.id,
			})
			if (isSuccessCreateResult) {
				localStorage.setItem('isPassed', 'true')
			}
		} else if (testResponse?.questions) {
			const notAnsweredSet = new Set(testResponse.questions.map(({ id }) => id))
			const keys = Object.keys(storage)

			for (const id of keys) {
				notAnsweredSet.delete(id)
			}

			const notAnswered = Array.from(notAnsweredSet)
			setNotAnswered(notAnswered)
			enqueueSnackbar('Вы ответили не на все вопросы', { variant: 'error' })
		}
	}
	if (isUserInfoLoading || isTestLoading) {
		return <Loader />
	}

	if (isSuccessGetTest && !testResponse?.questions.length) {
		return <p>Нет данных для отображения</p>
	}

	return (
		<Box component='main'>
			<Typography
				variant='h1'
				component='h1'
				sx={{
					fontSize: '32px',
					fontWeight: '700',
					mb: '32px',
				}}
			>
				Ответьте на вопросы, чтобы мы узнали о ваших навыках
			</Typography>
			{!!testResponse?.questions.length &&
				testResponse.questions.map((question, questionIndex) => (
					<ContentBlock
						totalCountQuestions={totalCount}
						key={question.id}
						question={question}
						questionIndex={questionIndex}
						onFocus={notAnswered[0]}
					/>
				))}

			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Button
					variant='contained'
					type='button'
					onClick={handleConfirm}
					disabled={DISABLED || isLoadingCreateResult}
				>
					Подтвердить
				</Button>
			</Box>
			<ModalSuccess
				openSuccessModal={openSuccessModal}
				closeModal={setOpenSuccessModal}
				message='Спасибо за прохождение теста !'
				type='isPassedTest'
			/>
		</Box>
	)
}
