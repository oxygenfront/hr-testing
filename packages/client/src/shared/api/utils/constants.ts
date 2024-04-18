export const SliceName = {
	rootApi: 'rootApi',
	storage: 'storage',
} as const

export enum ApiTag {
	AUTH = 'auth',
	QUESTIONS = 'questions',
	QUESTION = 'question',
	TESTS = 'tests',
	TEST = 'test',
	USERS = 'users',
	RESULTS = 'results',
}

export enum RequestMethod {
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export const API_BASE_URL = '/api'
const QUESTIONS = 'questions'
const TESTS = 'tests'
const USERS = 'users'
const RESULTS = 'results'
const CREATE = 'create'
const UPDATE = 'update'
const DELETE = 'delete'
const REPORTS = 'reports'

const AUTH = 'auth'
const SIGNUP = 'signup'
const LOGIN = 'login'

export const AUTH_LOGIN_API = `${AUTH}/${LOGIN}`
export const AUTH_API = `${AUTH}`

export const USER_SIGNUP_API = `${USERS}/${SIGNUP}`
export const GET_USERS_API = USERS

export const CREATE_QUESTION_API = `${QUESTIONS}/${CREATE}`
export const UPDATE_QUESTION_API = `${QUESTIONS}/${UPDATE}`
export const DELETE_QUESTION_API = `${QUESTIONS}/${DELETE}`
export const GET_QUESTIONS_API = QUESTIONS

export const CREATE_TEST_API = `${TESTS}/${CREATE}`
export const UPDATE_TEST_API = `${TESTS}/${UPDATE}`
export const DELETE_TEST_API = `${TESTS}/${DELETE}`
export const GET_TESTS_API = TESTS

export const CREATE_RESULT_API = `${RESULTS}/${CREATE}`
export const GET_RESULTS_API = `${RESULTS}`
export const GET_RESULT_REPORT_API = `${RESULTS}/${REPORTS}`
