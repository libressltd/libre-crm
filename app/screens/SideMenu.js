import React, { Component } from 'react';
import { Config } from '../../../../Config';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';

import { SideMenuItem } from '../../../../customize/SideMenuItem';

class SideMenu extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            items: Config.side_menu,
        };
    }

    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Content>
                        <List
                            dataArray={ this.state.items }
                            renderRow={ this.renderRow.bind(this) }
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    renderRow(item) {
        return <SideMenuItem item={ item } didPressRow={ this.didPressRow.bind(this) }/>;
    }

    didPressRow(item)
    {
        console.log(item);
        this.props.navigation.navigate(item.id, { config: item });
    }
};

module.exports = { SideMenu };
