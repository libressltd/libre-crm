
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
import { ProductList } from 'libre-crm/app/components/ProductList';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

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
            <View style = {{ backgroundColor: this.state.config.tab_color }}  tabLabel={ this.state.config.all_category } key={ -1 }>
                <GridView
                    items={this.state.data}
                    itemsPerRow={ 2 }
                    renderItem={ this.renderRow.bind(this) }
                />
            </View>
        ];

        all_tabs = all_tabs.concat(this.state.data.map((category) => {
            return (
                <View style = {{backgroundColor: this.state.config.tab_color }} tabLabel={ category.category_name } key={ category.id }>
                    <ProductList
                        config={ this.state.config }
                        category_id={ category.id }
                        didPressPost={ this.props.didPressPost }
                    />
                </View>
            )
        }));
        if (this.state.selected_index === false)
        {
            return (
                <ScrollableTabView 
                    renderTabBar={() => <ScrollableTabBar />}
                    ref={(tab) => this.tab = tab}
                >
                    { all_tabs }
                </ScrollableTabView>
            );
        }
        else
        {
            return (
                <ScrollableTabView 
                    renderTabBar={() => <ScrollableTabBar />} 
                    initialPage={this.state.selected_index}
                    ref={(tab) => this.tab = tab}
                >
                    { all_tabs }
                </ScrollableTabView>
            );
        }
    }

    renderRow(category) {
        var i;
        for (i = 0; i < this.state.data.length; i ++)
        {
            var item = this.state.data[i];
            if (item.id == category.id)
            {
                break;
            }
        }
        console.log(i);
        return (
            <CategoryCell 
                key={ category.id } 
                item={ category } 
                didPressCategory={() => this.tab.goToPage(i + 1)}
            />
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
