import CloseIcon from '@mui/icons-material/Close'
import { Alert, Collapse, IconButton } from '@mui/material'
import type { Dispatch, FC, SetStateAction } from 'react'

interface QuestionAlertProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	message?: string
}

export const QuestionAlert: FC<QuestionAlertProps> = ({
	open,
	message = 'При создании вопроса возникла ошибка',
	setOpen,
}) => (
	<Collapse in={open} sx={{ marginBottom: '12px' }}>
		<Alert
			severity='error'
			action={
				<IconButton
					aria-label='close'
					color='inherit'
					size='small'
					onClick={() => {
						setOpen(false)
					}}
				>
					<CloseIcon fontSize='inherit' />
				</IconButton>
			}
			sx={{ mb: 2 }}
		>
			{message}
		</Alert>
	</Collapse>
)
