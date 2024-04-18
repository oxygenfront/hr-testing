import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { storageSlice } from '@/entities/storage'
import { timerSlice } from '@/entities/timer'
import { rootApi } from '@/shared/api'

const rootReducer = combineReducers({
	[rootApi.reducerPath]: rootApi.reducer,
	[storageSlice.name]: storageSlice.reducer,
	[timerSlice.name]: timerSlice.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rootApi.middleware),
	devTools: import.meta.env.DEV,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
