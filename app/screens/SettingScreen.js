import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, Switch } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';


class SettingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            config: this.props.navigation.state.params ? this.props.navigation.state.params.config : Config.side_menu[0],
            enable: true,
        };
    }

    componentDidMount() {
        this.requestNotification();
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
                        <ListItem icon>
                            <Left>
                                <Icon name="plane" />
                            </Left>
                            <Body>
                                <Text>Airplane Mode</Text>
                            </Body>
                            <Right>
                                <Switch value={ this.state.enable } onValueChange={(value) => this.setState({ ...this.state, enable: value})} />
                            </Right>
                        </ListItem>
                        <Button block success style={{ margin: 20 }} onPress={() => this.didPressSend()}>
                            <Text>Send</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    requestNotification()
    {
        var didSubscribe = AsyncStorage.getItem('device_info', (err, result) => {
            if (result == null)
            {
                return;
            }
            fetch("https://onesignal.com/api/v1/players/" + result + "?app_id=3829214b-6b71-4af0-9874-31b3991d5e48", {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ ...this.state, enable: !responseJson.invalid_identifier})
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            }).done();
        });
    }

    didPressSend() {
        var indexAction = this.state.enable ? 1 : -2;
        var didSubscribe = AsyncStorage.getItem('device_info', (err, result) => {
            console.log("quangoi", result);
            if (result == null) {
                return;
            }
            fetch("https://onesignal.com/api/v1/players/" + result, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({"notification_types": indexAction})
            })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            }).done();
        });
    }
}

module.exports = { SettingScreen };