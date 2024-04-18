import { Input, useLoginMutation } from '@/entities/auth'
import { isErrorWithStatus } from '@/shared/model'
import { type LoginSchema, loginSchema } from '@/shared/model/loginSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Box, Button } from '@mui/material'
import { type FC, useEffect, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { loginDefaultValues } from '../model/constants'

export const Form: FC = () => {
	const [login, { isLoading, isError, error }] = useLoginMutation()

	const [responseError, setResponseError] = useState('')

	const { handleSubmit, watch, control } = useForm<LoginSchema>({
		defaultValues: loginDefaultValues,
		resolver: zodResolver(loginSchema),
	})

	useEffect(() => {
		if (isError && isErrorWithStatus(error)) {
			setResponseError(error.message)
		}
	}, [isError, error])

	watch(() => {
		if (responseError) {
			setResponseError('')
		}
	})

	const onSubmit: SubmitHandler<LoginSchema> = (data) => {
		login(data)
	}

	return (
		<Box
			component='div'
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: 'calc(100vh - 101px)',
			}}
		>
			<Box
				noValidate
				component='form'
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: '20px',
				}}
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1>Здравствуйте!</h1>
				{!!responseError && <Alert severity='error'>{responseError}</Alert>}
				<Input
					control={control}
					name='login'
					label='Логин'
					placeholder='email или login'
					required
					sx={{ width: 300 }}
				/>
				<Input
					control={control}
					name='password'
					label='Пароль'
					placeholder='фамилия или password'
					required
					sx={{ width: 300 }}
				/>
				<Button
					sx={{ lineHeight: 1.5, py: 2, width: 300 }}
					type='submit'
					variant='contained'
					disabled={isLoading}
				>
					Войти
				</Button>
			</Box>
		</Box>
	)
}
