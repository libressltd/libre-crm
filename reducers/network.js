import {
	START_REQUEST,
	STOP_REQUEST
} from '../actions/network';

export default function networkStatusReducer(state = 0, action) {
	switch (action.type) {
		case START_REQUEST:
			return state + 1;
		case STOP_REQUEST:
			return state - 1;
		default: 
			return state;
	}
}