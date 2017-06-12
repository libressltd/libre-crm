/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import { CategoryTabs } from 'libre-crm/app/components/CategoryTabs';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { Config } from '../../../../Config';

class CategoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: 'Testing',
            loading: true,
            config: this.props.navigation.state.params ? this.props.navigation.state.params.config : Config.side_menu[0]
        };
        this.requestCategory();
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left>
                            
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
                    <CategoryTabs config={ this.state.config }/>
                </Container>
            </StyleProvider>
        );
    }

    requestCategory() {
        fetch(this.state.config.url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.state.data = responseJson;
                this.state.loading = false;
                this.setState(this.state);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            }).done();
    }

    // didPressRightBarButton() {
    //     this.props.navigation.navigate("DrawerOpen");
    // }

    // didPressNotificationButton() {
    //     this.props.navigation.navigate("Notification");
    // }
}


module.exports = { CategoryScreen }