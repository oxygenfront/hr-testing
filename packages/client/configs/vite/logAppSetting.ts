import { loadEnv } from 'vite'

interface AppSettings {
	'MODE:': string
	'SERVER:': string
	'HOST:': string
	'UI_PORT:': string
	'SERVER_PORT:': string
}

export function logAppSettings(mode: string): AppSettings {
	const env = loadEnv(mode, '../env', 'SCREENING_')

	const appSettings: AppSettings = {
		'MODE:': mode,
		'SERVER:': 'NESTJS SERVER',
		'HOST:': env.SCREENING_HOST ?? 'localhost',
		'UI_PORT:': env.SCREENING_PORT ?? '5678',
		'SERVER_PORT:': env.SCREENING_SERVER_PORT ?? 'localhost',
	}

	return appSettings
}
