import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, Thumbnail } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';
import moment from 'moment'

class NotificationCell extends Component {
	render() {
		return (
			<ListItem avatar onPress={() => this.props.didPressNotification(this.props.item) }>
	            <Body>
	                <Text>{ this.props.item.title }</Text>
	                <Text note>{ this.props.item.message }</Text>
	            </Body>
	            <Right>
	                <Text note>{ moment(this.props.item.created_at).format('L') }</Text>
	            </Right>
	        </ListItem>
		);
	}
}

module.exports = { NotificationCell }