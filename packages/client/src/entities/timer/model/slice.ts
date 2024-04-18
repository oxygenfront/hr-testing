import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface TimerState {
	timeInSeconds: number | null
	isTimerRunning: boolean
}

const initialState: TimerState = {
	timeInSeconds: null,
	isTimerRunning: false,
}

export const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setInitialTimeInMinutes: (state, action: PayloadAction<number>) => {
			state.timeInSeconds = action.payload * 60
		},
		startTimer: (state) => {
			state.isTimerRunning = true
		},
		stopTimer: (state) => {
			state.isTimerRunning = false
			localStorage.setItem('time', '0')
		},
		decrementTime: (state) => {
			if (state.timeInSeconds !== null) {
				state.timeInSeconds -= 1
			}
		},
	},
})

export const { setInitialTimeInMinutes, decrementTime, startTimer, stopTimer } = timerSlice.actions
