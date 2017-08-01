export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_POST = 'SELECT_POST'

import Realm from '../models/models';
import { Config } from '../../../Config';
import { startRequest, stopRequest } from './network';

import CachedImage from 'react-native-cached-image';
const ImageCacheProvider = CachedImage.ImageCacheProvider;

export function selectPostId(post_id) {
	var posts = Realm.objects('Post').filtered(`id = '${post_id}'`);
	if (posts.length == 1)
	{
		return { 
			type: SELECT_POST,
			post: posts[0],
		}
	}
}

export function requestPost(category_id, requestOnly = false) {
	return (dispatch, getState) => {
		if (!requestOnly) {
		    dispatch(loadLocalPost(category_id));
		}
	    dispatch(requestOnlinePost(category_id, requestOnly));
	}
}

function requestOnlinePost(category_id, requestOnly = false)
{
	return (dispatch, getState) => {
		var config_url = Config.side_menu[0].post_url.replace("{category_id}", category_id);
		dispatch(startRequest());
	    fetch(config_url, {
	        method: 'GET',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
	    })
	    .then((response) => response.json())
	    .then((responseJson) => {
	        dispatch(receiveOnlinePost(responseJson.data, category_id, requestOnly));
	        dispatch(stopRequest());
	        return responseJson;
	    })
	    .catch((error) => {
	        dispatch(stopRequest());
	    }).done();
	}
}

function receiveOnlinePost(posts, category_id, requestOnly = false)
{
	return (dispatch, getState) => {
	    dispatch(saveLocalPost(posts, category_id));
	    if (!requestOnly) {
		    dispatch(loadLocalPost(category_id));	
	    }
	}
}

function saveLocalPost(posts, category_id)
{
	return (dispatch, getState) => {
		let allPostInCategory = Realm.objects('Post').filtered(`category_id = '${category_id}'`);
		Realm.write(() => {
			Realm.delete(allPostInCategory)
		});

		posts.map((post) => {
			Realm.write(() => {
				Realm.create('Post', post);
			});

			ImageCacheProvider.cacheMultipleImages([
				Config.media(post.preview_image_id),
				Config.media(post.banner_image_id),
			]);
	        if (post.type == 1) {
			    var media = JSON.parse(post.media);
	            if (media != null && media.images != null) {
	            	media.images.map((img) => {
	            		ImageCacheProvider.cacheMultipleImages([
	            			Config.media(img)
	            		]);
	            	})
	            }
			}
		})
	}
}

function loadLocalPost(category_id)
{
	return (dispatch, getState) => {
		let posts = Realm.objects('Post').filtered(`category_id = '${category_id}'`);
		dispatch(receivePost([[], ...posts], category_id));
	}
}

function receivePost(posts, category_id)
{
	return {
		type: RECEIVE_POSTS,
		posts,
		category_id
	};
}