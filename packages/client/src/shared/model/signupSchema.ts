import { z } from 'zod'

export const UserRoleEnum = z.enum(['USER', 'ADMIN'])

export const signupSchema = z.object({
	login: z.string().trim().min(1, { message: 'Введите логин' }),
	password: z.string().trim().min(1, { message: 'Введите фамилию' }),
	fullName: z.string(),
	testId: z.string().optional(),
	isAdmin: z.boolean().optional(),
})

export const signupFormSchema = signupSchema
	.extend({
		name: z.string().min(1, { message: 'Введите имя' }),
		testId: z.string().min(1, { message: 'Выберите тест для прохождения' }),
	})
	.omit({ fullName: true })

export const signupResponseSchema = signupSchema
	.extend({
		id: z.string().uuid(),
		role: UserRoleEnum,
	})
	.omit({ password: true, isAdmin: true })

export type SignupSchema = z.infer<typeof signupSchema>
export type SignupFormSchema = z.infer<typeof signupFormSchema>
export type SignupResponseSchema = z.infer<typeof signupResponseSchema>
