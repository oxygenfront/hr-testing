import { decrementTime, selectTimer, setInitialTimeInMinutes, startTimer, stopTimer } from '@/entities/timer'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import { Typography } from '@mui/material'
import { type FC, useEffect } from 'react'

interface ITimerProps {
	timeForTest: string | null
}

export const Timer: FC<ITimerProps> = ({ timeForTest }) => {
	const dispatch = useAppDispatch()
	const { timeInSeconds, isTimerRunning } = useAppSelector(selectTimer)

	useEffect(() => {
		dispatch(setInitialTimeInMinutes(JSON.parse(timeForTest as string) as number))
		dispatch(startTimer())
	}, [timeForTest, dispatch])

	useEffect(() => {
		if (isTimerRunning) {
			const timer = setInterval(() => {
				dispatch(decrementTime())
			}, 1000)

			return () => clearInterval(timer)
		}
	}, [isTimerRunning, dispatch])

	useEffect(() => {
		if (timeInSeconds === 0 && timeForTest) {
			dispatch(stopTimer())
		}
	}, [timeInSeconds, timeForTest, dispatch])

	const formatTime = (totalSeconds: number | null): string => {
		if (totalSeconds !== null) {
			const minutes = Math.floor(totalSeconds / 60)
			const seconds = totalSeconds % 60
			return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
		}
		return '00:00'
	}

	return (
		<Typography variant='h4' sx={(timeInSeconds as number) <= 10 ? { color: 'red' } : { color: 'white' }}>
			{formatTime(timeInSeconds)}
		</Typography>
	)
}
