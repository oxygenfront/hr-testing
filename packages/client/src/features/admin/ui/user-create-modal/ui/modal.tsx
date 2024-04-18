import { Input } from '@/entities/auth'
import { useGetTestsQuery } from '@/entities/tests'
import { useSignupMutation } from '@/features/admin/api/usersApi'
import { type SignupFormSchema, isErrorWithStatus, signupFormSchema } from '@/shared/model'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	InputLabel,
	List,
	MenuItem,
	Modal,
	Select,
	Typography,
} from '@mui/material'
import { useSnackbar } from 'notistack'
import { type DispatchWithoutAction, type FC, useEffect } from 'react'
import { Controller, type SubmitHandler, useForm } from 'react-hook-form'
import { createUserDefaultValues } from '../model/constants'

interface UserCreateModalProps {
	open: boolean
	closeModal: DispatchWithoutAction
}

export const UserCreateModal: FC<UserCreateModalProps> = ({ open, closeModal }) => {
	const [
		signup,
		{
			isLoading: isSignupLoading,
			isError: isSignupError,
			error: signupError,
			isSuccess: isSignupSuccess,
			data: signupResponse,
			originalArgs,
		},
	] = useSignupMutation()

	const { data, isFetching: isTestsFetching } = useGetTestsQuery()

	const {
		formState: { errors },
		handleSubmit,
		control,
		reset,
	} = useForm<SignupFormSchema>({
		defaultValues: createUserDefaultValues,
		resolver: zodResolver(signupFormSchema),
	})

	const { enqueueSnackbar } = useSnackbar()

	const onSubmit: SubmitHandler<SignupFormSchema> = ({ login, password, name, testId }) => {
		signup({ login, password, testId, fullName: `${name} ${password}` })
	}

	useEffect(() => {
		if (isSignupError && isErrorWithStatus(signupError)) {
			enqueueSnackbar(signupError.message, { variant: 'error' })
		}
	}, [isSignupError, signupError, enqueueSnackbar])

	useEffect(() => {
		if (isSignupSuccess) {
			reset()
		}
	}, [isSignupSuccess, reset])

	return (
		<Modal open={open} onClose={closeModal}>
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
					display: 'flex',
					flexDirection: 'column',
					gap: '20px',
				}}
			>
				{isSignupSuccess && signupResponse && (
					<Box>
						<Typography component='h6' sx={{ color: 'green', marginBottom: '10px' }}>
							Новый пользователь успешно создан!
						</Typography>
						<Typography component='p' sx={{ marginBottom: '10px' }}>
							Для прохождения теста кандидату <b>{signupResponse.fullName}</b> нужно будет войти на сайт
							используя
						</Typography>
						<Typography component='p' sx={{ marginBottom: '10px' }}>
							логин: <b>{signupResponse.login}</b>
						</Typography>
						<Typography component='p' sx={{ marginBottom: '10px' }}>
							пароль: <b>{originalArgs?.password}</b>
						</Typography>
					</Box>
				)}
				<Box
					noValidate
					component='form'
					onSubmit={handleSubmit(onSubmit)}
					sx={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}
				>
					<Input
						control={control}
						name='login'
						label='E-mail'
						placeholder='candidate@mail.com'
						type='email'
						required
						sx={{ width: 300 }}
					/>
					<Input control={control} name='name' label='Имя' placeholder='Иван' required sx={{ width: 300 }} />
					<Input
						control={control}
						name='password'
						label='Фамилия'
						placeholder='Иванов'
						required
						sx={{ width: 300 }}
					/>
					<FormControl required disabled={isTestsFetching}>
						<InputLabel id='select-variant-answers'>Выберите тест из списка</InputLabel>
						<Controller
							control={control}
							name='testId'
							render={({ field, fieldState: { invalid } }) => (
								<Select
									{...field}
									error={invalid}
									labelId='select-variant-answers'
									id='demo-simple-select'
									label='Выберите тест из списка'
									sx={{
										width: 300,
										'& #demo-simple-select': {
											display: 'flex',
											alignItems: 'center',
											gap: '10px',
										},
									}}
								>
									{data?.map((item) => (
										<MenuItem
											key={item.id}
											value={item.id}
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: '10px',
											}}
										>
											{item.title}
										</MenuItem>
									))}
								</Select>
							)}
						/>
						{errors.testId && <FormHelperText error>{errors.testId.message}</FormHelperText>}
					</FormControl>
					<Button disabled={isSignupLoading} variant='contained' type='submit' sx={{ width: 'fit-content' }}>
						Подтвердить
					</Button>
				</Box>
			</List>
		</Modal>
	)
}
