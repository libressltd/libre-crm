import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { PostCell } from '../../../../customize/PostCell';

class ProductList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			data: []
		}
	}

	componentDidMount() {
		this.requestProductList();
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

	requestProductList()
	{
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
			return responseJson;
		})
		.catch((error) => {
			console.error(error);
		})
	}
}

module.exports = { ProductList }