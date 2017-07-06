import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { Config } from '../../../../Config';
import { NotificationCell } from '../../../../customize/NotificationCell';

class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            config: Config.notification_screen,
            data: []
        }
    }

    componentDidMount() {
        this.requestNotification();
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left />
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
                        <List
                            dataArray={ this.state.data }
                            renderRow={(item) => <NotificationCell item={ item } didPressNotification={ this.didPressNotification.bind(this) }/>}
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    requestNotification()
    {
        fetch(this.state.config.url , {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({ ...this.state, data: responseJson });
            return responseJson;
        })
        .catch((error) => {
            console.error(error);
        })
    }

    didPressNotification(notification)
    {
        if (notification.post_id)
        {
            this.props.navigation.navigate("PostDetail", { config: this.state.config, post_id: notification.post_id });
        }
        console.log(notification);
    }
}

module.exports = { NotificationScreen }