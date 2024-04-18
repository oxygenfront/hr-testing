import { Alert, Snackbar } from '@mui/material'
import type { Dispatch, FC, SetStateAction, SyntheticEvent } from 'react'

interface ErrorSnackbarProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	message?: string
}

export const ErrorSnackbar: FC<ErrorSnackbarProps> = ({
	open,
	message = 'Выберите хотя бы один правильный ответ',
	setOpen,
}) => {
	const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return
		}
		setOpen(false)
	}

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity='error' variant='outlined' sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	)
}
