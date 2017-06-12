/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native';

class CategoryCell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const window = Dimensions.get('window');
        return (
            <TouchableOpacity key={ this.props.item.id } onPress={this.didPressCell.bind(this)}>
                <Image
                    style={{ marginLeft: 7, marginRight: 7, height: window.width * 180 / 375 - 7,
                    width: window.width * 180 / 375 - 7}}
                    source={{ uri: "http://jobs.mustachee.com/lbmedia/" + this.props.item.icon_id }}
                />
                <View  style={{marginLeft: 7, marginRight: 7 }} styleName="content">
                    <Text numberOfLines={3} style={{marginLeft: 5, marginRight: 5, color: '#212121', textAlign: "center", width: window.width * 180 / 375 }}>{this.props.item.category_name}</Text>
                </View>
             </TouchableOpacity>
        );
    }

    didPressCell() {
        this.props.didPressCategory(this.props.item);
    }
}

module.exports = {CategoryCell}
