import React, { Component } from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {observer, inject} from 'mobx-react'

@inject('auth')
@observer
class IsValidPassword extends Component {
    static propTypes = {

    };

    render() {
        console.log('---', this.props.auth.isValidPassword)
        return (
            <View>
                <Text>Password is Valid: {this.props.auth.isValidPassword.toString()}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
})

export default IsValidPassword
