/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import { View } from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, Tabs, Tab, ScrollableTab } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import GridView from 'react-native-grid-view'
import { CategoryCell } from '../../../../customize/CategoryCell';
import { ProductList } from 'libre-crm/app/components/ProductList'


class CategoryTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            config: this.props.config,
            selected_index: false
        };
    }

    componentDidMount() {
        this.requestCategory();
    }

    render()
    {
        var all_tabs = [ 
            <Tab heading={ this.state.config.all_category }key={ -1 }>
                <GridView
                    items={this.state.data}
                    itemsPerRow={ 2 }
                    renderItem={ this.renderRow.bind(this) }
                />
            </Tab>
        ];

        all_tabs = all_tabs.concat(this.state.data.map((category) => {
            return (
                <Tab heading={ category.category_name } key={ category.id }>
                    <ProductList
                        config={ this.state.config }
                        category_id={ category.id }
                        didPressPost={ this.props.didPressPost }
                    />
                </Tab>
            )
        }));
        if (this.state.selected_index === false)
        {
            return (
                <View />
            );
        }
        else
        {
            return (
                <Tabs renderTabBar={()=> <ScrollableTab />} initialPage={ this.state.selected_index }>
                    { all_tabs }
                </Tabs>
            );
        }
    }

    renderRow(category) {
        return (
            <CategoryCell key={ category.id } item={ category } didPressCategory={this.props.didPressCategory.bind(this)}/>
        );
    }

    requestCategory() {

        fetch(this.state.config.url , {
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
            for (var i = 0; i < this.state.data.length; i ++)
            {
                var c = this.state.data[i];
                if (this.props.selected_category && c.id == this.props.selected_category.id)
                {
                    this.state.selected_index = i + 1;
                }
            }
            if (this.state.selected_index === false)
            {
                this.state.selected_index = 0;
            }
            this.setState(this.state);
            return responseJson;
        })
        .catch((error) => {
            console.log("request category error");
            console.error(error);
        });
    }
}


module.exports = { CategoryTabs }