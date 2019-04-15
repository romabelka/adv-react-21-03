import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {observer} from 'mobx-react'
import authStore from '../stores/auth'

@observer
class IsValidPassword extends Component {
    static propTypes = {

    };

    render() {
        console.log('---', authStore.isValidPassword)
        return (
            <View>
                <Text>Password is Valid: {authStore.isValidPassword.toString()}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default IsValidPassword
