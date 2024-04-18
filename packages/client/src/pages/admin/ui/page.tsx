import { ExpandLess, ExpandMore, PeopleAltOutlined, QuizOutlined } from '@mui/icons-material'
import { Collapse, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { type FC, useState } from 'react'

import { ListModal, ListQuestions, ListTests, ListUsers } from '@/features/admin'
import type { IOpenAccordion } from '@/pages/admin/model'
import { IoApps } from 'react-icons/io5'

export const Admin: FC = () => {
	const [open, setOpen] = useState<IOpenAccordion>({
		selectTest: false,
		viewCandidates: false,
		questions: false,
	})
	const [selectedTestId, setSelectedTestId] = useState('')
	const [openModal, setOpenModal] = useState(false)

	const handleOpenAccordion = (arg: keyof IOpenAccordion) => {
		setOpen((prevValue) => ({
			...prevValue,
			[arg]: !prevValue[arg],
		}))
	}

	const handleOpenModal = (id: string) => {
		setSelectedTestId(id)
		setOpenModal(true)
	}

	return (
		<>
			<Typography
				variant='h3'
				component='h1'
				sx={{
					textAlign: 'center',
					mb: '30px',
					fontWeight: 700,
				}}
			>
				Панель администратора
			</Typography>
			<ListItemButton onClick={() => handleOpenAccordion('selectTest')}>
				<ListItemIcon>
					<IoApps fontSize='1.5rem' />
				</ListItemIcon>
				<ListItemText
					primary='Выбор теста'
					primaryTypographyProps={{
						fontSize: '20px',
					}}
				/>
				{open.selectTest ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open.selectTest} timeout='auto' unmountOnExit={true}>
				<ListTests state={{ valueSelected: selectedTestId, handleOpenModalTest: handleOpenModal }} />
			</Collapse>
			<ListItemButton onClick={() => handleOpenAccordion('viewCandidates')}>
				<ListItemIcon>
					<PeopleAltOutlined />
				</ListItemIcon>
				<ListItemText
					primary='Просмотр кандидатов'
					primaryTypographyProps={{
						fontSize: '20px',
					}}
				/>
				{open.viewCandidates ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open.viewCandidates} timeout='auto' unmountOnExit={true}>
				<ListUsers />
			</Collapse>
			<ListItemButton onClick={() => handleOpenAccordion('questions')}>
				<ListItemIcon>
					<QuizOutlined />
				</ListItemIcon>
				<ListItemText primary='Вопросы' primaryTypographyProps={{ fontSize: '20px' }} />
				{open.questions ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open.questions} timeout='auto' unmountOnExit={true}>
				<ListQuestions />
			</Collapse>
			{openModal && (
				<ListModal selectedTestId={selectedTestId} setOpenModal={setOpenModal} openModal={openModal} />
			)}
		</>
	)
}
