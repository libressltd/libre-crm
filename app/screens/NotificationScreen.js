import React, { Component } from 'react';

import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, StyleProvider, Item, Input, Label, Form, Text, List, ListItem } from 'native-base';
import getTheme from '../../../../native-base-theme/components';
import material from '../../../../native-base-theme/variables/platform';
import { Config } from '../../../../Config';
import { NetInfo } from 'react-native';
import { NotificationCell } from '../../../../customize/NotificationCell';
import Model from '../../../../customize/Model';

class NotificationScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: Config.notification_screen,
            data: []
        }
    }

    componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
                this.requestNotification(isConnected);
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
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    <Header>
                        <Left />
                        <Body>
                            <Title>{ this.state.config.title }</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name='menu' />
                            </Button>
                        </Right>
                    </Header>
                    <Content style = {{ backgroundColor: this.state.config.color_bg }}>
                        <List
                            dataArray={ this.state.data }
                            renderRow={(item) => <NotificationCell item={ item } didPressNotification={ this.didPressNotification.bind(this) }/>}
                        />
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

    requestNotification(isConnected)
    {
      if(isConnected == false){
            this.saveNotification(this.state.data, isConnected);
      } else {
            fetch(this.state.config.url , {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({ ...this.state, data: responseJson });
                // this.saveNotification(responseJson, isConnected);
                return responseJson;
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }

    saveNotification(post, isConnected){
      let allNotification = Model.objects('Notification');
      //Kiem tra intenet va thuc hien
      if(isConnected == true){
          //Xoa phan tu cu, va them phan tu moi
          Model.write(() => {
            		Model.delete(allNotification)
            });
          for(var i = 0; i < post.length; i ++){
            Model.write(() => {
              Model.create('Notification', {id: post[i].id ,title: post[i].title,message: post[i].message, post_id: post[i].post_id, created_at: post[i].created_at});
            });
          }
      } else {
          //Hien thi phan tu da save
        this.state.data = allNotification;
        this.setState(this.state);
      }
    }

        didPressNotification(notification)
        {
            if (notification.post_id)
            {
                this.props.navigation.navigate("PostDetail", { config: this.state.config, post_id: notification.post_id });
            }
            console.log(notification);
      }
}

module.exports = { NotificationScreen }
