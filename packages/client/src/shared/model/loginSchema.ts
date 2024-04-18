import { z } from 'zod'
import { signupSchema } from './signupSchema'

export const loginSchema = signupSchema
	.extend({
		password: z.string().min(1, { message: 'Введите пароль' }),
	})
	.pick({ login: true, password: true })

export type LoginSchema = z.infer<typeof loginSchema>
