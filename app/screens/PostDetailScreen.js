/**
 * Sample React Native App
 * https://g10hub.com/facebook/react-native
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
    TouchableOpacity,
    NetInfo
} from 'react-native';
import HTMLView from 'react-native-htmlview';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem, H1, H3 } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import moment from 'moment';
import Swiper from 'react-native-swiper';
import { Config } from '../../../../Config';
import Model from '../../../../customize/Model';

class PostDetailScreen extends Component {

    constructor(props) {
        super(props);
        const {params} = this.props.navigation.state;
        this.state = {
            post_id: params.post_id,
            post: params.post,
            loading: false,
            config: this.props.navigation.state.params.config
        };
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
                this.requestPost(isConnected);
          });
          function handleFirstConnectivityChange(isConnected) {
              NetInfo.isConnected.removeEventListener(
                'change',
                handleFirstConnectivityChange
              );
          }
          NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange);
    }

    render() {
        if (this.state.post)
        {
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
                                <Title>{ this.state.post.title || ""}</Title>
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
                          }}>{ this.state.post.title || ""}</H3>
                          <Text note style={{
                              color: 'rgba(0, 0, 0, 0.7)',
                              margin: 20,
                              textAlign: 'right'
                          }}>{ moment(this.state.post.created_at).format('MMM s, YYYY, HH:mm') }</Text>
                          { this.renderSlider() }
                          { this.renderBanner() }
                            <HTMLView
                                value={ this.state.post.description || "" }
                                nodeComponentProps={{ style: { textAlign: 'right' }}}
                                style={{ margin: 10 }}
                            />
                          </View>
                        </Content>
                    </Container>
                </StyleProvider>
            );
        }
        else
        {
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

                            </Body>
                            <Right>
                                <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                    <Icon name='menu' />
                                </Button>
                            </Right>
                        </Header>
                        <Content>

                        </Content>
                    </Container>
                </StyleProvider>
            );
        }
    }


    renderSlider() {
        const window = Dimensions.get('window');
        if (this.state.post.type == 1) {
            if (this.state.post.media != null && this.state.post.media.images != null) {
                return (
                    <Swiper height={ window.width } width={ window.width }>
                        { this.state.post.media.images.map(function (object, i) {
                            return (
                                <View>
                                    <Image
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
                    source={{uri: Config.media(this.state.post.media.video) }}
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
                        source={{uri: Config.media(this.state.post.banner_image_id) }}
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

    requestPost(isConnected) {
        this.state.loading = true;
        this.setState(this.state);
        //this.savePost(this.state.post, false);
        if(isConnected == false){
            this.state.loading = true;
            var query = '';
            if(this.state.post != null){
                query = 'id = "' + this.state.post.id + '"';
            } else {
                query = 'id = "' + this.state.post_id + '"';
            }
            let postData = Model.objects('PostDetail').filtered(query);
            this.state.post = postData[0];
            this.setState(this.state);
        } else {
            var config_url = this.state.config.post_detail_url.replace("{post_id}", (this.state.post ? this.state.post.id : this.state.post_id));
            console.log("tndasda", config_url);
            fetch(config_url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.state.post = responseJson;
                    this.state.loading = false;
                    this.setState(this.state);
                    this.savePost(responseJson, isConnected);

                    return responseJson;
                })
                .catch((error) => {
                    console.log("bisaoday", error);
                    console.error(error);
                }).done();
        }

      }

      savePost(post, isConnected){
          var query = '';
          if(this.state.post != null){
              query = 'id = "' + this.state.post.id + '"';
          } else {
              query = 'id = "' + this.state.post_id + '"';
          }
          let postData = Model.objects('PostDetail').filtered(query);
          //Kiem tra intenet va thuc hien
          if(isConnected == true){
              //Xoa phan tu cu, va them phan tu moi
              Model.write(() => {
                    Model.delete(postData)
                });
              Model.write(() => {
                Model.create('PostDetail', {id: post.id ,title: post.title,short_description: post.short_description, description: post.description, created_at: post.created_at});
              });
          } else {
              //Hien thi phan tu da save
              this.state.post = postData[0];
              this.setState(this.state);
          }
      }
}

module.exports = {PostDetailScreen}
