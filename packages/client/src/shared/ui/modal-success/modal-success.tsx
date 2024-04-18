import { Path } from '@/shared/model'
import { Box, Button, Modal, Typography } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import type { IModalSuccessProps } from './types'

export const ModalSuccess: FC<IModalSuccessProps> = ({
	closeModal,
	openSuccessModal,
	message,
	// handleResetForm,
	type,
}) => {
	return (
		<Modal open={openSuccessModal} onClose={() => closeModal(false)}>
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
					{message}
				</Typography>
				{type === 'createQuestion' ? (
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button type='button' variant='contained' sx={{ p: 0 }}>
							<Link to={Path.ADMIN} style={{ width: '100%', margin: '6px 16px' }}>
								Создать новый вопрос
							</Link>
						</Button>
						<Link to={Path.ADMIN}>Перейти к созданию теста</Link>
					</Box>
				) : type === 'editQuestion' ? (
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button type='button' variant='contained' sx={{ p: 0 }}>
							<Link to={Path.ADMIN} style={{ width: '100%', margin: '6px 16px' }}>
								На главную админ панели
							</Link>
						</Button>
						<Link to={Path.ADMIN}>Перейти к созданию теста</Link>
					</Box>
				) : (
					<></>
				)}
			</Box>
		</Modal>
	)
}
