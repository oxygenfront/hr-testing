import { Path } from '@/shared/model'
import { Box, Button, Link, Modal, Typography } from '@mui/material'
import type { Dispatch, FC, SetStateAction } from 'react'

import { NavLink } from 'react-router-dom'

interface CreateQuestionModalProps {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
	resetForm: VoidFunction
}

export const CreateQuestionModal: FC<CreateQuestionModalProps> = ({ open, setOpen, resetForm }) => (
	<Modal open={open} onClose={() => setOpen(false)}>
		<Box
			sx={{
				position: 'absolute',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				width: 600,
				bgcolor: 'background.paper',
				boxShadow: 24,
				borderRadius: '10px',
				p: 4,
				display: 'grid',
				gap: 4,
			}}
		>
			<Typography variant='h6' component='h1' justifySelf='center'>
				Вопрос успешно создан!
			</Typography>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Button type='button' variant='contained' onClick={resetForm}>
					Создать новый вопрос
				</Button>
				<Link component={NavLink} to={Path.ADMIN}>
					Перейти к созданию теста
				</Link>
			</Box>
		</Box>
	</Modal>
)
