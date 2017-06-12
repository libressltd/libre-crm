import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AboutUsScreen } from 'libre-crm/app/screens/AboutUsScreen';
import { SideMenu } from 'libre-crm/app/screens/SideMenu';
import OneSignal from 'react-native-onesignal';
import { DrawerView, StackNavigator, DrawerNavigator } from 'react-navigation';

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

const ParentDrawerNavigator = DrawerNavigator({
    AboutUs: {screen: AboutUsScreen},
    AboutUs1: {screen: AboutUsScreen},
}, {
    drawerPosition: 'right',
    contentComponent: props => renderContent(props)
});

function renderContent(props) {
    return (
        <SideMenu { ...props }/>
    );
}

module.exports = { LBCRM }
