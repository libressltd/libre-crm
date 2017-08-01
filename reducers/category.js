import {
	REQUEST_CATEGORIES,
	RECEIVE_CATEGORIES,
	SELECT_CATEGORY,
} from '../actions/category';

export default function categoriesReducer(state = [], action) {
	switch (action.type) {
		case RECEIVE_CATEGORIES:
			return action.categories;
		default:
			return state;
	}
}

export function selectedCategoryReducer(state = false, action) {
	switch (action.type) {
		case SELECT_CATEGORY:
			return action.category;
		default: 
			return state;
	}
}