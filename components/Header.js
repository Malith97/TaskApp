import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.firstContainer}>
                    <Text style={styles.smallHeading}>Hello,</Text>
                    <Text style={styles.heading}>Note App </Text>
                </View>
                <View style={styles.secondContainer}>
                    <Icon name="plus" size={30} color="#fff" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: '#435DCC',
        paddingHorizontal: 30,
        borderBottomRightRadius: 35,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    firstContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    secondContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    smallHeading: {
        color: '#FFFFFF',
        fontSize: 25
    },
    heading: {
        color: '#FFFFFF',
        fontSize: 35
    }
})
