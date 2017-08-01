export const GO_TO_POSTS_SCREEN = 'GO_TO_POSTS_SCREEN'

import { selectCategoryId } from './post';

export function goToPostsScreen(category_id) {
	return (dispatch, getState) => {
		dispatch(selectCategoryId(category_id));
		dispatch(didGoToPostScreen());
	}
}

function didGoToPostScreen() {
	return {
		type: GO_TO_POSTS_SCREEN,
	}
}