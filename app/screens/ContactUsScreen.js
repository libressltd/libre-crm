import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';


class ContactUsScreen extends Component {

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
                            <Button transparent onPress={() => this.props.navigation.navigate("Notification")}>
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
                        <Form>
                            <Item stackedLabel>
                                <Label>Username</Label>
                                <Input onChangeText={(text) => this.setState({...this.state, name: text})}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Email</Label>
                                <Input onChangeText={(text) => this.setState({...this.state, email: text})}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Description</Label>
                                <Input multiline={ true } style={{ height: 200 }} onChangeText={(text) => this.setState({...this.state, message: text })}/>
                            </Item>
                        </Form>
                        <Button block success style={{ margin: 20 }} onPress={() => this.requestFeedback()}>
                            <Text>Send</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    requestFeedback()
    {
        fetch(this.state.config.url , {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.name,
                message: this.state.message
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        })
    }
}

module.exports = { ContactUsScreen };