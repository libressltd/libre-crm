/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    View,
    Navigator,
    Dimensions,
    Linking,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, H1, H3 } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import moment from 'moment';
import Swiper from 'react-native-swiper';

class PostDetailScreen extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            post: params.post,
            loading: false
        };
        this.requestPost();
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
                            <Title>{ this.state.post.title }</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <H3 style={{
                            color: 'blue',
                            margin: 20,
                            textAlign: 'right'
                        }}>{ this.state.post.category.category_name }</H3>
                        <H1 style={{
                            marginLeft: 20,
                            marginRight: 20,
                            textAlign: 'right'
                        }}>{ this.state.post.title }</H1>
                        <Text note style={{
                            color: 'rgba(0, 0, 0, 0.7)',
                            margin: 20,
                            textAlign: 'right'
                        }}>{ moment(this.state.post.created_at).format('MMM s, YYYY, HH:mm') }</Text>
                        { this.renderSlider() }
                        { this.renderBanner() }

                        <HTMLView
                            style={{ margin: 10 }}
                            value={ this.state.post.description }
                            renderNode={ this.renderText }
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    renderSlider() {
        const window = Dimensions.get('window');
        if (this.state.post.type == 1) {
            if (this.state.post.media != null && this.state.post.media.images != null) {
                return (
                    <Swiper height={ window.width } width={ window.width }>
                        { this.state.post.media.images.map(function (object, i) {
                            console.log(object);
                            return (
                                <View>
                                    <Image
                                        style={{ height: window.width, width: window.width }}
                                        source={{uri: "http://jobs.mustachee.com/lbmedia/" + object}}
                                    />
                                </View>
                            );
                        })}
                    </Swiper>
                );
            }
        }
        else if (this.state.post.type == 2) {
            return (
                <Video
                    source={{uri: "http://jobs.mustachee.com/" + this.state.post.media.video}}
                    height={ window.width }
                    width={ window.width }
                />
            );
        }
        else if (this.state.post.type == 3) {
            var elements = this.state.post.media.youtube.split("=")
            var video = elements[elements.length - 1];
            elements = video.split("/");
            video = elements[elements.length - 1];

            return (
                <TouchableOpacity onPress={(event) => this.didPressYoutube(event) }>
                
                </TouchableOpacity>
            );
        }
    }

    renderBanner() {
        if (this.state.post.banner_image_id != null) {
            const window = Dimensions.get('window');
            return (
                <TouchableOpacity onPress={(event) => this.didPressBanner(event) } style={{marginTop: 10}}>
                    <Image
                        style={{width: window.width, height: window.height * 0.1}}
                        source={{uri: "http://jobs.mustachee.com/lbmedia/" + this.state.post.banner_image_id}}
                    />
                </TouchableOpacity>
            );
        }
        return null;
    }

    didPressBack() {
        this.props.navigation.goBack();
    }

    didPressBanner() {
        Linking.openURL(this.state.post.banner_url);
    }

    didPressYoutube() {
        Linking.openURL(this.state.post.media.youtube);
    }

    requestPost() {
        this.state.loading = true;
        this.setState(this.state);
        fetch('http://jobs.mustachee.com/api/offer/' + this.state.post.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.state.post = responseJson;
                this.state.loading = false;
                this.setState(this.state);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            }).done();
    }
}

module.exports = {PostDetailScreen}
