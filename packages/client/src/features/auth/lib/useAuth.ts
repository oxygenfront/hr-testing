import { useGetAuthQuery } from '@/entities/auth'
import { Path, isUnauthorizeError } from '@/shared/model'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useAuth = () => {
	const { isError, isSuccess, error, data } = useGetAuthQuery()
	const { pathname } = useLocation()

	const navigate = useNavigate()

	useEffect(() => {
		if (isError || isUnauthorizeError(error)) {
			navigate(Path.AUTH)
		}
	}, [isError, error, navigate])

	useEffect(() => {
		if (isSuccess && data && data.user.role === 'ADMIN' && (pathname === Path.BASE || pathname === Path.AUTH)) {
			navigate(Path.ADMIN)
		}
	}, [isSuccess, data, pathname, navigate])

	useEffect(() => {
		if (isSuccess && data && data.user.role === 'USER' && pathname !== Path.BASE) {
			navigate(Path.BASE)
		}
	}, [pathname, isSuccess, data, navigate])

	return useAuth
}
