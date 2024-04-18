export type ErrorWithStatus = {
	message: string
	statusCode: number
}

function isObject(error: unknown): error is Record<string, unknown> {
	return !!error && typeof error === 'object'
}

export function isErrorWithStatus(error: unknown): error is ErrorWithStatus {
	return (
		isObject(error) &&
		'message' in error &&
		typeof error.message === 'string' &&
		'statusCode' in error &&
		typeof error.statusCode === 'number'
	)
}

export function isUnauthorizeError(error: unknown): error is ErrorWithStatus {
	return isObject(error) && 'data' in error && isErrorWithStatus(error.data) && error.data.statusCode === 401
}

export function isCreateConflictError(error: unknown): error is ErrorWithStatus {
	return isObject(error) && 'data' in error && isErrorWithStatus(error.data) && error.data.statusCode === 409
}

export function isNotFoundError(error: unknown): error is ErrorWithStatus {
	return isObject(error) && 'data' in error && isErrorWithStatus(error.data) && error.data.statusCode === 404
}

export function isIncorrectPasswordError(error: unknown): error is ErrorWithStatus {
	return isObject(error) && 'data' in error && isErrorWithStatus(error.data) && error.data.statusCode === 403
}
