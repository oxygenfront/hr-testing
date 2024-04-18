import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
type DispatchFunc = () => AppDispatch

export const useAppDispatch: DispatchFunc = useDispatch
// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
