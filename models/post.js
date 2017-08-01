import Realm from 'realm';

export default class Post extends Realm.Object {

}

Post.schema = {
    name: 'Post',
    properties: {
        id: 'int',
        title: 'string',
        type: 'string',
        media: 'string',
        preview_image_id: 'string',
        banner_image_id: {type: 'string', optional: true},
        short_description: 'string',
        description: 'string',
        category_id: 'string',
        updated_at: 'string',
    },
};