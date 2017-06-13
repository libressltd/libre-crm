import React, { Component } from 'react';


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';


class NotificationScreen extends Component {
	render() {
		return (
			<StyleProvider style={getTheme(material)}>
			    <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='ios-notifications-outline' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{ this.state.config.title }</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
			        <Content>
			        	
			        </Content>
			    </Container>
			</StyleProvider>
		);
	}
}

module.exports = { NotificationScreen }