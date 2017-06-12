/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {CategoryPostCell} from 'libre-crm/app/components/CategoryTabs';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';


class CategoryScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title: 'Testing',
            loading: true,
            config: this.props.navigation.state.params.config
        };
        this.requestCategory();
    }

    render() {
        const groupedData = GridRow.groupByRows(this.state.data, 2, () => {
            return 1;
        });
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header hasTabs>
                        <Left>
                            <Button transparent>
                                <Icon name='menu' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{ this.state.config.title }</Title>
                        </Body>
                        <Right />
                    </Header>
                </Container>
            </StyleProvider>
        );
    }

    // renderTab() {

    // }

    // renderRow(category) {
    //     return (
    //         <View style={{backgroundColor: '#fff200'}}>
    //             <CategoryCell category={category} didPressCategory={this.didPressCategory.bind(this)}/>
    //         </View>
    //     );
    // }

    // renderRowCategory(category) {
    //     return (
    //         <View style={{backgroundColor: 'white'}}>
    //             <CategoryPostCell category={category} didPressCategory={this.didPressCategory.bind(this)}/>
    //         </View>
    //     );
    // }

    // requestCategory() {
    //     fetch(this.state.config.url, {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         }
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             this.state.data = responseJson;
    //             this.state.loading = false;
    //             this.setState(this.state);
    //             return responseJson;
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         }).done();
    // }

    // didPressCategory(category) {
    //     this.props.navigation.navigate("Post", {category: category});
    // }

    // didPressRightBarButton() {
    //     this.props.navigation.navigate("DrawerOpen");
    // }

    // didPressNotificationButton() {
    //     this.props.navigation.navigate("Notification");
    // }
}


module.exports = { CategoryScreen }