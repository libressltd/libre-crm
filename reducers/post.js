import {
	REQUEST_POSTS,
	RECEIVE_POSTS,
	SELECT_POST
} from '../actions/post';

import {
	SELECT_CATEGORY
} from '../actions/category';

export default function postsReducer(state = [], action) {
	switch (action.type) {
		case SELECT_CATEGORY:
			return action.posts;
		default:
			return state;
	}
}

export function selectedPostReducer(state = false, action) {
	switch (action.type) {
		case SELECT_POST:
			return action.post;
		default: 
			return state;
	}
}