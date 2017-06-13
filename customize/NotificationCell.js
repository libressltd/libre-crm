import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, Thumbnail } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';


class NotificationCell extends Component {
	render() {
		return (
			<ListItem avatar onPress={() => this.props.didPressPost(this.props.item) }>
	            <Left>
	                <Thumbnail source={{ uri: "http://jobs.mustachee.com/lbmedia/" + this.props.item.preview_image_id }} />
	            </Left>
	            <Body>
	                <Text>{ this.props.item.title }</Text>
	                <Text note>{ this.props.item.short_description }</Text>
	            </Body>
	            <Right>
	                <Text note>{ this.props.item.updated_at }</Text>
	            </Right>
	        </ListItem>
		);
	}
}

module.exports = { NotificationCell }