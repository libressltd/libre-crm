import React, { Component } from 'react';


import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';


class SettingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            config: this.props.navigation.state.params ? this.props.navigation.state.params.config : Config.side_menu[0],
            email: "",
            name: "",
            message: ""
        };
    }
    
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
				        <ListItem icon>
	                        <Left>
	                            <Icon name="plane" />
	                        </Left>
	                        <Body>
	                          <Text>Airplane Mode</Text>
	                        </Body>
	                        <Right>
	                            <Switch value={false} />
	                        </Right>
	                    </ListItem>
                        <Button block success style={{ margin: 20 }} onPress={() => this.requestFeedback()}>
                            <Text>Send</Text>
                        </Button>
			        </Content>
			    </Container>
			</StyleProvider>
		);
	}
}

module.exports = { SettingScreen };