/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AsyncStorage,
    TouchableHighlight,
    View,
    Dimensions,
    Navigator
} from 'react-native';
import OneSignal from 'react-native-onesignal';
import {CategoryCell} from '../elements/CategoryCell';
import {NavigationBar, Text} from '@shoutem/ui';
import {Define} from '../Define';
import {CategoryPostCell} from '../elements/CategoryPostCell';

class CategoryTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            config: this.props.config,
            selected_category: false
        };
        this.requestCategory();
    }

    render()
    {
        var all_tabs = this.state.data.map((category) => {
            return <Tab heading={ category.name } />
        });
        return (
            <Tabs renderTabBar={()=> <ScrollableTab />} initialPage={ 5 }>
                { all_tabs }
            </Tabs>
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
}


module.exports = { CategoryTabs }