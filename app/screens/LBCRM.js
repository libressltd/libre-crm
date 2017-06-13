import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AboutUsScreen } from 'libre-crm/app/screens/AboutUsScreen';
import { SideMenu } from 'libre-crm/app/screens/SideMenu';
import { CategoryScreen } from 'libre-crm/app/screens/CategoryScreen';
import { PostDetailScreen } from 'libre-crm/app/screens/PostDetailScreen';
import { PostScreen } from 'libre-crm/app/screens/PostScreen';
import { ContactUsScreen } from 'libre-crm/app/screens/ContactUsScreen';
import { SettingScreen } from 'libre-crm/app/screens/SettingScreen';
import { NotificationScreen } from 'libre-crm/app/screens/NotificationScreen';
import OneSignal from 'react-native-onesignal';
import { DrawerView, StackNavigator, DrawerNavigator } from 'react-navigation';
import { Config } from '../../../../Config';

class LBCRM extends Component {
    render() {
        return (
            <ParentDrawerNavigator />
        );
    }

    componentWillMount() {
        AsyncStorage.getItem("statusNoti").then(value => {
            if (value == null)
            {
                OneSignal.setSubscription(true);
            }
            else
            {
                if (value == 1)
                {
                    OneSignal.setSubscription(true);
                }
                else
                {
                    OneSignal.setSubscription(false);
                }
            }
        });
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('registered', this.onRegistered);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('registered', this.onRegistered);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onRegistered(notifData) {
        console.log("Device had been registered for push notifications!", notifData);
    }

    onIds(device) {
        AsyncStorage.setItem('device_info', device.userId);
        console.log('Device info: ', device);
    }
}

var parent_screens = {};
for (var i = 0; i < Config.side_menu.length; i ++)
{
    var item = Config.side_menu[i];
    switch (item.type)
    {
        case "ABOUT_US":
        {
            parent_screens[item.id] = {
                screen: AboutUsScreen
            };
            break;
        }
        case "CATEGORY": 
        {
            const CategoryStack = StackNavigator({
                Category: { screen: CategoryScreen },
                Post: {screen: PostScreen},
                PostDetail: {screen: PostDetailScreen},

            }, {
                headerMode: 'none',
            });
            parent_screens[item.id] = {
                screen: CategoryStack
            };
            break;
        }
        case "CONTACT_US":
        {
            parent_screens[item.id] = {
                screen: ContactUsScreen
            }
            break;
        }
        case "SETTING": 
        {
            parent_screens[item.id] = {
                screen: SettingScreen
            }
            break;
        }
        case "NOTIFICATION": 
        {
            const NotificationStack = StackNavigator({
                Notification: { screen: NotificationScreen },
                PostDetail: {screen: PostDetailScreen},
            }, {
                headerMode: 'none',
            });
            parent_screens[item.id] = {
                screen: NotificationScreen
            }
            break;
        }
    }
}

const NotificationStack = StackNavigator({
    Notification: { screen: NotificationScreen },
    PostDetail: {screen: PostDetailScreen},
}, {
    headerMode: 'none',
});
parent_screens['Notification'] = { screen: NotificationStack };

const ParentDrawerNavigator = DrawerNavigator(parent_screens, {
    drawerPosition: 'right',
    contentComponent: props => renderContent(props)
});

function renderContent(props) {
    return (
        <SideMenu { ...props }/>
    );
}

module.exports = { LBCRM }
