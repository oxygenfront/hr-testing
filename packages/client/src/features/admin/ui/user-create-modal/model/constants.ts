import type { SignupFormSchema } from '@/shared/model'

export const createUserDefaultValues: SignupFormSchema = {
	login: '',
	password: '',
	name: '',
	testId: '',
}
