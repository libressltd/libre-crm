import React, { Component } from 'react';
import { connect } from 'react-redux';
import { requestCategory, selectPostId } from 'libre-crm/actions/post';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { CategoryTabs } from 'libre-crm/app/components/CategoryTabs';
import { ProductList } from 'libre-crm/app/components/ProductList';
import { PostCell } from '../../../../customize/PostCell';

import { requestPost } from '../../actions/post';

class PostScreen extends Component {

    componentDidMount() {
        this.props.dispatch(requestPost(this.props.selectedCategory.id));
    }

    render() {
        const { selectedCategory, navigation, posts} = this.props;
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
                            <Title>{ selectedCategory.category_name }</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                    <List
                        dataArray={ posts }
                        renderRow={ this.renderRow.bind(this) }
                    />
                </Container>
            </StyleProvider>
        );
    }

    renderRow(item)
    {
        var item_id = item.id
        return <PostCell item={item} didPressPost={() => this.didPressPost(item_id) }/>
    }

    didPressPost(post_id)
    {
        this.props.dispatch(selectPostId(post_id));
        this.props.navigation.navigate("PostDetail");
    }

    didPressCategory(category)
    {
        this.props.navigation.navigate("Post", { category: category, config: this.state.config });
    }
}

function mapStateToProps(state)
{
    const { selectedCategory, posts } = state;
    return {
        selectedCategory,
        posts
    };
}

export default connect(mapStateToProps)(PostScreen)