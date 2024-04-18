import { store } from '@/app/store'
import '@/shared/ui/index.css'

import { router } from '@/app/router'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
let container: null | HTMLElement = null

document.addEventListener('DOMContentLoaded', () => {
	if (!container) {
		container = document.getElementById('root') as HTMLElement
		const root = createRoot(container)

		root.render(
			<StrictMode>
				<SnackbarProvider maxSnack={3}>
					<Provider store={store}>
						<RouterProvider router={router} />
					</Provider>
				</SnackbarProvider>
			</StrictMode>
		)
	}
})
