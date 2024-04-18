import type { QuestionType } from '@/shared/model'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
export interface IStorageData {
	[key: string]: string[]
}
export interface IStorageState {
	storedAnswers: string | null
	storage: IStorageData
}

const initialState: IStorageState = {
	storedAnswers: localStorage.getItem('answers') || null,
	storage: {},
}

export const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		setStorageInitial: (state: IStorageState) => {
			state.storage = JSON.parse(state.storedAnswers || '{}') as IStorageData
		},
		setStorage: (
			state,
			action: PayloadAction<{
				answer: string
				answerType: QuestionType
				indexQuestion: string
			}>
		) => {
			const { answer, answerType, indexQuestion } = action.payload
			const updatedStorage: IStorageData = { ...state.storage }

			if (answerType !== 'radio') {
				if (updatedStorage[indexQuestion]?.includes(answer)) {
					updatedStorage[indexQuestion] = updatedStorage[indexQuestion].filter((val) => val !== answer)
				} else {
					updatedStorage[indexQuestion] = [...(updatedStorage[indexQuestion] || []), answer]
				}
			} else {
				updatedStorage[indexQuestion] = [answer]
			}

			if (updatedStorage[indexQuestion] && updatedStorage[indexQuestion].length === 0) {
				delete updatedStorage[indexQuestion]
			}

			localStorage.setItem('answers', JSON.stringify(updatedStorage))
			state.storage = updatedStorage
		},
		clearStorage: (state) => {
			state.storedAnswers = null
			state.storage = {}
			localStorage.clear()
		},
	},
})

export const { setStorage, clearStorage, setStorageInitial } = storageSlice.actions
