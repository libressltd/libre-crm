/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import HTMLView from 'react-native-htmlview';

class AboutUsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: this.props.navigation.state.params ? this.props.navigation.state.params.config : false
        }
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left />
                        <Body>
                            <Title>Header</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <HTMLView
                            value={ this.state.config ? this.state.config.content : "" }
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

module.exports = { AboutUsScreen }
