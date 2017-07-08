import React, { Component } from 'react';

import { Container, Header, Keyboard,
    Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';

import {
    Alert
} from 'react-native';

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
                        <Label style={{ textAlign: 'right', paddingRight: 5 }}>{ this.state.config.username }</Label>
                        <Input style={{ textAlign: 'right' }} onChangeText={(text) => this.setState({...this.state, name: text})}/>
                        <Label style={{ textAlign: 'right', paddingRight: 5 }}>{ this.state.config.useremail }</Label>
                        <Input style={{ textAlign: 'right' }} onChangeText={(text) => this.setState({...this.state, email: text})}/>
                        <Label style={{ textAlign: 'right', paddingRight: 5 }}>{ this.state.config.desciption }</Label>
                        <Input multiline={ true } style={{ height: 200, textAlign: 'right' }} onChangeText={(text) => this.setState({...this.state, message: text })}/>
                        <Button block success style={{ margin: 20 }} onPress={() => this.requestFeedback()}>
                            <Text>{ this.state.config.btn_send }</Text>
                        </Button>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    requestFeedback() {
        if (!this.validateEmail(this.state.email)) {
            Alert.alert(
                this.state.config.error,
                this.state.config.email_notvail,
                [
                    {
                        text: 'OK', onPress: () => {
                    }, style: 'cancel'
                    }
                ],
                {cancelable: false}
            )
        } else if (this.state.name == "") {
            Alert.alert(
                this.state.config.error,
                this.state.config.name_empty,
                [
                    {
                        text: 'OK', onPress: () => {
                    }, style: 'cancel'
                    }
                ],
                {cancelable: false}
            )
        } else if (this.state.message == "") {
            Alert.alert(
                this.state.config.error,
                this.state.config.message_empty,
                [
                    {
                        text: 'OK', onPress: () => {
                    }, style: 'cancel'
                    }
                ],
                {cancelable: false}
            )
        } else {
            fetch(this.state.config.url, {
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
                    if (responseJson.code == 200) {
                        Alert.alert(
                            this.state.config.contactus_alert_success,
                            this.state.config.contactus_alert_success_message,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                }, style: 'cancel'
                                }
                            ],
                            {cancelable: false}
                        )
                    } else {
                        Alert.alert(
                            this.state.config.alert_error,
                            this.state.config.name_notavail + " " + this.state.config.desc_notvalid,
                            [
                                {
                                    text: 'OK', onPress: () => {
                                }, style: 'cancel'
                                }
                            ],
                            {cancelable: false}
                        )
                    }
                    return responseJson;
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
}

module.exports = { ContactUsScreen };