import { useGetQuestionByIdQuery, useUpdateQuestionMutation } from '@/features/admin/api'

import { EditQuestionModal } from '@/features/edit-question'
import type { AnswerUpdateSchema, CreateQuestionSchema, UpdateQuestionSchema } from '@/shared/model'
import {
	AddAnswerButton,
	AnswersList,
	GoBackButton,
	Loader,
	QuestionAlert,
	QuestionTitleTextField,
	QuestionTypeSelect,
} from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useState } from 'react'
import { FormProvider, type UseFieldArrayUpdate, useFieldArray, useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { type UpdateQuestionFormSchema, updateQuestionDefaultValues, updateQuestionFormSchema } from './constants'

export const EditQuestion: FC = () => {
	const { id } = useParams()
	const { enqueueSnackbar } = useSnackbar()

	const [openSuccessModal, setOpenSuccessModal] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)
	const [errorAlert, setErrorAlert] = useState('')

	const {
		data,
		isLoading,
		isSuccess,
		isFetching,
		isUninitialized,
		isError: isGetQuestionError,
	} = useGetQuestionByIdQuery(id, {
		skip: !id,
	})

	const [updateQuestion, { isError: isUpdateQuestionError, isSuccess: isUpdateQuestionSuccess }] =
		useUpdateQuestionMutation()

	const methods = useForm<UpdateQuestionFormSchema>({
		defaultValues: updateQuestionDefaultValues,
		resolver: zodResolver(updateQuestionFormSchema),
	})

	const {
		control,
		formState: { isDirty, dirtyFields, isValid },
		reset,
		handleSubmit,
	} = methods

	const { fields, append, remove, update } = useFieldArray({
		control,
		name: 'answers',
	})

	const handleAddAnswer = () => {
		append({ title: '', isCorrect: false })
	}

	const onSubmit = (formData: UpdateQuestionFormSchema) => {
		const isCorrectAnswersExist = formData.answers.some((answer) => answer.isCorrect)

		if (!isCorrectAnswersExist) {
			enqueueSnackbar('Необходимо добавить хотя бы один верный вариант ответа', { variant: 'error' })

			return
		}

		if (isValid && isDirty && id) {
			const requestData: UpdateQuestionSchema = { id }

			const entries = Object.entries(dirtyFields)

			for (const item of entries) {
				const [key, value] = item as [key: keyof UpdateQuestionFormSchema, value: unknown]

				if (value) {
					const keys = {
						title: () => {
							requestData.title = formData.title
						},
						type: () => {
							requestData.type = formData.type
						},
						answers: () => {
							const newAnswers = formData.answers.map((answer) => {
								const newAnswer: AnswerUpdateSchema = {
									title: answer.title,
									isCorrect: answer.isCorrect,
								}

								if (answer.answerId) {
									newAnswer.id = answer.answerId
								}

								return newAnswer
							})

							requestData.answers = newAnswers
						},
					}

					keys[key]()
				}
			}

			updateQuestion(requestData)
		}
	}

	useEffect(() => {
		if (isGetQuestionError || isUpdateQuestionError) {
			setErrorAlert(
				isUpdateQuestionError
					? 'При редактировании вопроса возникла ошибка'
					: 'Не удалось найти вопрос для редактирования'
			)
			setOpenErrorAlert(true)
		}
	}, [isGetQuestionError, isUpdateQuestionError])

	useEffect(() => {
		if (isSuccess && data) {
			const { id, ...rest } = data
			const answers = data.answers.map((answer) => ({ ...answer, answerId: answer.id }))
			reset({ ...rest, answers })
		}
	}, [isSuccess, data, reset])

	useEffect(() => {
		if (isUpdateQuestionSuccess) {
			setOpenSuccessModal(true)
		}
	}, [isUpdateQuestionSuccess])

	if (isLoading || isFetching || isUninitialized) {
		return <Loader />
	}

	return (
		<>
			<Box>
				<QuestionAlert open={openErrorAlert} message={errorAlert} setOpen={setOpenErrorAlert} />
				<FormProvider {...methods}>
					<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
						<Box sx={{ display: 'flex', mb: 3, gap: 5, height: 'auto' }}>
							<QuestionTitleTextField />
							<QuestionTypeSelect />
						</Box>
						<Box sx={{ mb: 3 }}>
							<AnswersList
								fields={fields}
								remove={remove}
								update={update as UseFieldArrayUpdate<CreateQuestionSchema, 'answers'>}
							/>
						</Box>
						<Box sx={{ display: 'flex', gap: 5 }}>
							<AddAnswerButton addAnswer={handleAddAnswer} />
							<Button
								type='submit'
								variant='contained'
								sx={{ width: '50%', borderRadius: '12px', fontWeight: '700' }}
							>
								Сохранить
							</Button>
							<GoBackButton />
						</Box>
					</Box>
					{import.meta.env.DEV && <DevTool control={control} />}
				</FormProvider>
			</Box>
			<EditQuestionModal open={openSuccessModal} setOpen={setOpenSuccessModal} />
		</>
	)
}
