/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { Container, Header, Title, Text, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import HTMLView from 'react-native-htmlview';

class AboutUsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: this.props.navigation.state.params ? this.props.navigation.state.params.config : false
        }

        this.requestContent();
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
                        <HTMLView
                            // value={ this.state.config ? (this.state.config.url != null ?
                            //     (this.state.config.url) :  this.state.config.content) : ""}
                            value = { this.state.content }
                            renderNode={ this.renderText }
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
    renderText(node, index, siblings, parent, defaultRenderer)
    {
        if (node.name == 'p') {
            return (
                <Text style={{ textAlign: 'right', paddingRight: 8, paddingLeft: 8 }}>{ defaultRenderer(node.children, node) }</Text>
            );
        }
        if (node.name == 'h1') {
            return (
                <Text style={{ textAlign: 'right', fontSize: 21, fontWeight: 'bold', paddingRight: 8, paddingLeft: 8 }}>{ defaultRenderer(node.children, node) }</Text>
            );
        }
    }

    requestContent() {
        if(this.state.config != null) {
            if (this.state.config.url != null) {
                fetch(this.state.config.url, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);
                        this.state.content = "<p>" + responseJson.content + "</p>";
                        this.setState(this.state);
                        return responseJson;
                    })
                    .catch((error) => {
                        console.error(error);
                    }).done();
            } else {
                this.state.content = this.state.config.content
            }
        }

    }
}

module.exports = { AboutUsScreen }
