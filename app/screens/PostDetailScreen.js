import React, {Component} from 'react';
import { connect } from 'react-redux';

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
    TouchableOpacity,
    NetInfo
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import CachedImage from 'react-native-cached-image';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, H1, H3 } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { Config } from '../../../../Config';
import Model from '../../../../customize/Model';

class PostDetailScreen extends Component {
    render() {
        const { post, category } = this.props;
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
                            <Title>{ post.title || ""}</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                      <View>
                      <H3 style={{
                          marginTop: 5,
                          marginLeft: 20,
                          marginRight: 20,
                          textAlign: 'right'
                      }}>{ post.title || ""}</H3>
                      <Text note style={{
                          color: 'rgba(0, 0, 0, 0.7)',
                          margin: 20,
                          textAlign: 'right'
                      }}>{ moment(post.created_at).format('MMM s, YYYY, HH:mm') }</Text>
                      { this.renderSlider() }
                      { this.renderBanner() }
                        <HTMLView
                            value={ post.description || "" }
                            nodeComponentProps={{ style: { textAlign: 'right' }}}
                            style={{ margin: 10 }}
                        />
                      </View>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }


    renderSlider() {
        const window = Dimensions.get('window');
        const { post, category } = this.props;
        var media = JSON.parse(post.media);
        if (post.type == 1) {
            if (media != null && media.images != null) {
                return (
                    <Swiper height={ window.width } width={ window.width }>
                        { media.images.map(function (object, i) {
                            return (
                                <View key={i}>
                                    <CachedImage
                                        style={{ height: window.width, width: window.width }}
                                        source={{uri: Config.media(object) }}
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
                    source={{uri: Config.media(media.video) }}
                    height={ window.width }
                    width={ window.width }
                />
            );
        }
        else if (this.state.post.type == 3) {
            var elements = media.youtube.split("=")
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
        const { post } = this.props;
        if (post.banner_image_id != null) {
            const window = Dimensions.get('window');
            return (
                <TouchableOpacity onPress={(event) => this.didPressBanner(event) } style={{marginTop: 10}}>
                    <CachedImage
                        style={{width: window.width, height: window.height * 0.1}}
                        source={{uri: Config.media(post.banner_image_id) }}
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
}


function mapStateToProps(state)
{
    const { selectedCategory, selectedPost } = state;
    return {
        category: selectedCategory,
        post: selectedPost
    };
}

export default connect(mapStateToProps)(PostDetailScreen)
