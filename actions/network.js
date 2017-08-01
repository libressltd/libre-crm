export const START_REQUEST = 'START_REQUEST'
export const STOP_REQUEST = 'STOP_REQUEST'

export function startRequest() {
	return {
		type: START_REQUEST
	}
}

export function stopRequest() {
	return {
		type: STOP_REQUEST
	}
}