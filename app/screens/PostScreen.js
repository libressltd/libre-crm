import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { CategoryTabs } from 'libre-crm/app/components/CategoryTabs';

class PostScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: this.props.navigation.state.params.category,
            config: this.props.navigation.state.params.config
        }
    }
    render() {
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.goBack()}>
                                <Icon name='md-arrow-back' />
                            </Button>
                        </Left>
                        <Body>
                            <Title>{ this.state.category.category_name }</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                    <CategoryTabs
                        config={ this.state.config } 
                        didPressPost={ this.didPressPost.bind(this) } 
                        didPressCategory={ this.didPressCategory.bind(this) } 
                        selected_category={ this.props.navigation.state.params.category }
                    />
                </Container>
            </StyleProvider>
        );
    }

    didPressPost(post)
    {
        this.props.navigation.navigate("PostDetail", { post: post, config: this.state.config });
    }

    didPressCategory(category)
    {
        this.props.navigation.navigate("Post", { category: category, config: this.state.config });
    }
}

module.exports = { PostScreen }