import type { ProxyOptions } from 'vite'
import { loadEnv } from 'vite'

export function setProxyConfig(mode: string) {
	const env = loadEnv(mode, '../env', 'SCREENING_')

	const apiHost = env.SCREENING_HOST
	const apiPort = env.SCREENING_SERVER_PORT
	const apiPath = `http://${apiHost}:${apiPort}`

	const proxyOptions = {
		target: apiPath,
		changeOrigin: true,
		secure: false,
	}

	const proxyConfig: Record<string, ProxyOptions> = {
		'^/api/.*': proxyOptions,
	}

	return proxyConfig
}
