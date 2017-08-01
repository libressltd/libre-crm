import Realm from 'realm';
import Category from './category';
import Post from './post';

let realm = new Realm({schema: [Category, Post]});

export default realm;