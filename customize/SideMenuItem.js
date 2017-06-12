import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../native-base-theme/components';
import material from '../native-base-theme/variables/platform';

export class SideMenuItem extends Component
{
    render()
    {
        return (
            <ListItem icon onPress={() => this.props.didPressRow(this.props.item)}>
                <Left>
                    <Icon name="plane" />
                </Left>
                <Body>
                  <Text>{ this.props.item.title }</Text>
                </Body>
            </ListItem>
        )
    }
}
