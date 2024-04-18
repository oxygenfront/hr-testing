import { Admin } from '@/pages/admin/ui'
import { CreateQuestionPage } from '@/pages/create-question'
import { Path } from '@/shared/model'
import { Loader } from '@/shared/ui'
import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { BaseLayout as App } from './layout'

const MainQuestionsPage = lazy(() =>
	import('@/pages/main-questions-page').then((module) => ({
		default: module.MainQuestionsPage,
	}))
)
const Auth = lazy(() =>
	import('@/pages/auth').then((module) => ({
		default: module.Auth,
	}))
)

const EditQuestionPage = lazy(() =>
	import('@/pages/edit-question').then((module) => ({
		default: module.EditQuestionPage,
	}))
)

export const router = createBrowserRouter([
	{
		path: Path.BASE,
		element: <App />,
		children: [
			{
				path: Path.BASE,
				element: (
					<Suspense fallback={<Loader />}>
						<MainQuestionsPage />
					</Suspense>
				),
			},
			{
				path: Path.AUTH,
				element: <Auth />,
			},
			{
				path: Path.ADMIN,
				element: (
					<Suspense fallback={<Loader />}>
						<Admin />
					</Suspense>
				),
			},
			{
				path: `${Path.ADMIN_EDIT_QUESTION}/:id`,
				element: (
					<Suspense fallback={<Loader />}>
						<EditQuestionPage />
					</Suspense>
				),
			},
			{
				path: Path.ADMIN_CREATE_QUESTION,
				element: (
					<Suspense fallback={<Loader />}>
						<CreateQuestionPage />
					</Suspense>
				),
			},
		],
	},
])
