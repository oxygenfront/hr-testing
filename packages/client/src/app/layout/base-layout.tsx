import { setStorageInitial } from '@/entities/storage'
import { useAuth } from '@/features/auth'
import { useAppDispatch } from '@/shared/lib'
import { type Path, titles } from '@/shared/model'
import { Layout } from '@/shared/ui'
import { type FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const BaseLayout: FC = () => {
	useAuth()

	const { pathname } = useLocation()

	const dispatch = useAppDispatch()

	useEffect(() => {
		document.title = titles[pathname as Path] || 'Редактирование вопроса'
	}, [pathname])

	useEffect(() => {
		dispatch(setStorageInitial())
	}, [dispatch])

	return <Layout />
}
