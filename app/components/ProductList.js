import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { PostCell } from '../../../../customize/PostCell';
import Model from '../../../../customize/Model';
import { NetInfo } from 'react-native';

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
			NetInfo.isConnected.fetch().then(isConnected => {
							this.requestProductList(isConnected);
				});
				function handleFirstConnectivityChange(isConnected) {
						NetInfo.isConnected.removeEventListener(
							'change',
							handleFirstConnectivityChange
						);
				}
				NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange);
	}

	render() {
		return (
			<List
				dataArray={ this.state.data }
				renderRow={ this.renderRow.bind(this) }
			/>
		);
	}

	renderRow(item)
	{
		return <PostCell item={item} didPressPost={ this.props.didPressPost }/>
	}

	requestProductList(isConnected)
	{
		if(isConnected == false){
					this.savePost(this.state.data, isConnected);
		} else {
					var config_url = this.props.config.post_url.replace("{category_id}", this.props.category_id);
					fetch(config_url , {
						method: 'GET',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json',
						}
					})
					.then((response) => response.json())
					.then((responseJson) => {
						this.state.data = responseJson.data;
						this.setState(this.state);
						this.savePost(responseJson.data, isConnected);
						return responseJson;
					})
					.catch((error) => {
						console.error(error);
					})
			}
		}

		savePost(post, isConnected){
			var query = 'category_id = "' + this.props.category_id + '"';
      let allPost = Model.objects('Post').filtered(query);
      //Kiem tra intenet va thuc hien
      if(isConnected == true){
          //Xoa phan tu cu, va them phan tu moi
          Model.write(() => {
            		Model.delete(allPost)
            });
          for(var i = 0; i < post.length; i ++){
            Model.write(() => {
              Model.create('Post', {id: post[i].id ,title: post[i].title,preview_image_id: post[i].preview_image_id, short_description: post[i].short_description, category_id: post[i].category_id, updated_at: post[i].updated_at, category: post[i].category});
            });
          }
      } else {
          //Hien thi phan tu da save
        this.state.data = allPost;
        this.setState(this.state);
      }
    }
}

module.exports = { ProductList }
