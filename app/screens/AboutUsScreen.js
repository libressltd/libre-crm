/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';

class AboutUsScreen extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left />
                        <Body>
                            <Title>Header</Title>
                        </Body>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                    </Header>
                    <Content>

                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}

module.exports = { AboutUsScreen }
