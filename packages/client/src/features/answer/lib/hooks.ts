import { selectStorage, setStorage } from '@/entities/storage'
import { useAppDispatch, useAppSelector } from '@/shared/lib'
import type { QuestionResponseSchema, QuestionType } from '@/shared/model'
import { useState } from 'react'

export const useOnChangeInput = ({ question }: { question: QuestionResponseSchema }) => {
	const dispatch = useAppDispatch()
	const { storage } = useAppSelector(selectStorage)

	const [value, setValue] = useState<string[]>(storage[question.id] || [])

	const handleSetValue = (answer: string, answerType: string) => {
		setValue((prevValue) => {
			if (answerType !== 'radio') {
				return prevValue.includes(answer) ? prevValue.filter((val) => val !== answer) : [...prevValue, answer]
			}
			return [answer]
		})
	}
	function handleOnChangeInput(answer: string, answerType: QuestionType) {
		dispatch(setStorage({ answer, answerType, indexQuestion: question.id }))
		handleSetValue(answer, answerType)
	}
	return { handleOnChangeInput, value }
}
