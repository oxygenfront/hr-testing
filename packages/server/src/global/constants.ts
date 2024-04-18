export enum Route {
	BASE = 'api',
	PING = 'ping',
	AUTH = 'auth',
	LOGIN = 'login',
	QUESTIONS = 'questions',
	CREATE = 'create',
	CREATE_MANY = 'create_many',
	GET_BY_ID = ':id',
	UPDATE = 'update',
	DELETE = 'delete',
	RESULTS = 'results',
	REPORTS = 'reports',
	REPORT_BY_ID = 'reports/:id',
	TESTS = 'tests',
	USERS = 'users',
	SIGNUP = 'signup',
	DELETE_BY_ID = 'delete/:id',
}

export enum SwaggerApiTag {
	PING = 'ping',
	AUTH = 'auth',
	QUESTIONS = 'questions',
	RESULTS = 'results',
	TESTS = 'tests',
	USERS = 'users',
}
