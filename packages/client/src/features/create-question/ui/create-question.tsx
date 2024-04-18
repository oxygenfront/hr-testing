import { useCreateQuestionMutation } from '@/features/admin/api'
import { CreateQuestionModal } from '@/features/create-question/ui'
import type { CreateQuestionSchema } from '@/shared/model'
import { QuestionTypeEnum, createQuestionSchema } from '@/shared/model/questionsSchema'
import {
	AddAnswerButton,
	AnswersList,
	GoBackButton,
	QuestionAlert,
	QuestionTitleTextField,
	QuestionTypeSelect,
} from '@/shared/ui'
import { DevTool } from '@hookform/devtools'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Button } from '@mui/material'
import { useSnackbar } from 'notistack'
import { type FC, useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { createQuestionDefaultAnswer, createQuestionDefaultValues } from '../model/constants'

export const CreateQuestion: FC = () => {
	const [openSuccessModal, setOpenSuccessModal] = useState(false)
	const [openErrorAlert, setOpenErrorAlert] = useState(false)

	const { enqueueSnackbar } = useSnackbar()

	const [createQuestion, { isSuccess, isError }] = useCreateQuestionMutation()

	const methods = useForm<CreateQuestionSchema>({
		defaultValues: createQuestionDefaultValues,
		resolver: zodResolver(createQuestionSchema),
	})

	const { control, watch, reset, handleSubmit } = methods

	const { fields, append, remove, update } = useFieldArray({
		control,
		name: 'answers',
	})

	const handleAddAnswer = () => {
		append(createQuestionDefaultAnswer)
	}

	const handleResetForm = () => {
		const resetValue =
			watch('type') === QuestionTypeEnum.enum.radio
				? { ...createQuestionDefaultValues, type: QuestionTypeEnum.enum.radio, answers: [] }
				: createQuestionDefaultValues

		reset(resetValue)
		setOpenSuccessModal(false)
	}

	const onSubmit = (data: CreateQuestionSchema) => {
		const isCorrectAnswersExist = data.answers.some((answer) => answer.isCorrect)

		if (!isCorrectAnswersExist) {
			enqueueSnackbar('Необходимо добавить хотя бы один верный вариант ответа', { variant: 'error' })

			return
		}

		createQuestion(data)
	}

	useEffect(() => {
		if (isError) {
			setOpenErrorAlert(true)
		}
	}, [isError])

	useEffect(() => {
		if (isSuccess) {
			setOpenSuccessModal(true)
		}
	}, [isSuccess])

	return (
		<>
			<Box component='section'>
				<QuestionAlert open={openErrorAlert} setOpen={setOpenErrorAlert} />
				<FormProvider {...methods}>
					<Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate>
						<Box sx={{ display: 'flex', mb: 3, gap: 5 }}>
							<QuestionTitleTextField />
							<QuestionTypeSelect />
						</Box>
						<AnswersList fields={fields} remove={remove} update={update} />
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
						{import.meta.env.DEV && <DevTool control={control} />}
					</Box>
				</FormProvider>
			</Box>
			<CreateQuestionModal open={openSuccessModal} setOpen={setOpenSuccessModal} resetForm={handleResetForm} />
		</>
	)
}
