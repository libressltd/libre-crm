import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Platform } from 'react-native';
import Share from "react-native-share";
import { Config } from '../../../../Config';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';

import { SideMenuItem } from '../../../../customize/SideMenuItem';
import { SideMenuHeader } from '../../../../customize/SideMenuHeader';
import { SideMenuFooter } from '../../../../customize/SideMenuFooter';

import { requestCategory } from '../../actions/category';

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
                <Container style={{ backgroundColor: Config.side_menu_style.backgroundColor }}>
                    <Content>
                        <List>
                            <SideMenuHeader />
                            { Config.side_menu && Config.side_menu.map((item, index) => (
                                <SideMenuItem key={ index }item={ item } didPressRow={ this.didPressRow.bind(this) }/>
                            ))}
                            <ListItem icon onPress={() => this.props.dispatch(requestCategory(true))}>
                                <Body style ={{ height: 40}}>
                                    <Title style={{ textAlign: "right", color: "#fff", marginRight: 8 }}>
                                        شغل وضع عدم الاتصال بالانترنت
                                    </Title>
                                </Body>
                                <Right style ={{ height: 40}}>
                                    <Icon name="md-cloud-download" size={ 30 } style={{ color: "#FFF" }}/>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                    <SideMenuFooter />
                </Container>
            </StyleProvider>
        );
    }

    renderRow(item) {
        return <SideMenuItem item={ item } didPressRow={ this.didPressRow.bind(this) }/>;
    }

    didPressRow(item)
    {
        if (item.type == 'SHARE')
        {
            var url;
            if (Platform.OS === 'ios')
            {
                url = item.ios_link;
            }
            else
            {
                url = item.android_link;
            }
            Share.open({
                share_text: item.share_text,
                share_URL: url,
                title: item.share_title,
                url: url
            }, function (e) {
                console.log(e);
            });
        }
        else
        {
            this.props.navigation.navigate(item.id, { config: item });
        }
    }
};


function mapStateToProps(state)
{
    return {

    };
}

export default connect(mapStateToProps)(SideMenu)
