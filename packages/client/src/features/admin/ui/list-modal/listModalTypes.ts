import type { Dispatch, SetStateAction } from 'react'

export interface ListModalProps {
	selectedTestId: string
	setOpenModal: Dispatch<SetStateAction<boolean>>
	openModal: boolean
}
