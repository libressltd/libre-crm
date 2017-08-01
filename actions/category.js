export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'

import CachedImage from 'react-native-cached-image';
const ImageCacheProvider = CachedImage.ImageCacheProvider;

import Realm from '../models/models';
import { Config } from '../../../Config';
import { requestPost } from './post';
import { startRequest, stopRequest } from './network';

export function selectCategoryId(category_id) {
	var categories = Realm.objects('Category').filtered(`id = '${category_id}'`);
	var posts = Realm.objects('Post').filtered(`category_id = '${category_id}'`);
	if (categories.length == 1)
	{
		return { 
			type: SELECT_CATEGORY,
			category: categories[0],
			posts
		}
	}
}

export function requestCategory(preload = false) {
	return (dispatch, getState) => {
	    dispatch(loadLocalCategory());
	    if (getState().categories.length == 0 || preload)
		{
		    dispatch(requestOnlineCategory(preload));
		}
	}
}

function requestOnlineCategory(preload)
{
	return (dispatch, getState) => {
		dispatch(startRequest());
	    fetch(Config.side_menu[0].url, {
	        method: 'GET',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	        }
	    })
	    .then((response) => response.json())
	    .then((responseJson) => {
	        dispatch(receiveOnlineCategory(responseJson, preload));
	        dispatch(stopRequest());
	        return responseJson;
	    })
	    .catch((error) => {
	    	dispatch(stopRequest());
	    }).done();
	}
}

function receiveOnlineCategory(categories, preload)
{
	return (dispatch, getState) => {
	    dispatch(saveLocalCategory(categories));
	    dispatch(loadLocalCategory());
	    if (preload)
	    {
		    categories.map((category) => {
		    	dispatch(requestPost(category.id, true));
		    });
	    }
	}
}

function saveLocalCategory(categories)
{
	return (dispatch, getState) => {
		let allCategory = Realm.objects('Category');
		Realm.write(() => {
			Realm.delete(allCategory)
		});

		categories.map((category) => {
			Realm.write(() => {
				Realm.create('Category', {
					id: category.id ,
					category_name: category.category_name, 
					icon_id: category.icon_id
				});
			});
			ImageCacheProvider.cacheMultipleImages([
				Config.media(category.icon_id)
			]);
		})
	}
}

function loadLocalCategory()
{
	return (dispatch, getState) => {
		let categories = Realm.objects('Category');
		dispatch(receiveCategory(categories));
	}
}

function receiveCategory(categories)
{
	return {
		type: RECEIVE_CATEGORIES,
		categories
	};
}