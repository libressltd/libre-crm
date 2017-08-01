import Realm from 'realm';

export default class Category extends Realm.Object {

}

Category.schema = {
    name: 'Category',
    properties: {
        id: 'int',
        category_name: 'string',
        icon_id: 'string',
    },
};