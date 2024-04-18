export enum Path {
	BASE = '/',
	AUTH = '/auth',
	ADMIN = '/admin',
	ADMIN_EDIT_QUESTION = '/admin/edit-question',
	ADMIN_CREATE_QUESTION = '/admin/create-question',
}

export const titles: Record<Path, string> = {
	[Path.BASE]: 'Тест',
	[Path.ADMIN]: 'Админ панель',
	[Path.ADMIN_CREATE_QUESTION]: 'Создание вопроса',
	[Path.AUTH]: 'Вход',
	[Path.ADMIN_EDIT_QUESTION]: 'Редактирование вопроса',
}

export const DISABLED =
	typeof window !== 'undefined' &&
	window.localStorage &&
	(JSON.parse(localStorage.getItem('isPassed') as string) as boolean)
