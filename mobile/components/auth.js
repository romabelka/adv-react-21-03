import React, { Component } from 'react'
import {View, Text, Button, TextInput} from 'react-native'

class Auth extends Component {
    static propTypes = {

    };

    state = {
        email: '',
        password: ''
    }

    setEmail = (email) => this.setState({ email })
    setPassword = (password) => this.setState({ password })

    render() {
        return (
            <View>
                <View>
                    <Text>Email:</Text>
                    <TextInput keyboardType="email-address" value={this.state.email} onChangeText={this.setEmail}/>
                </View>
                <View>
                    <Text>Password:</Text>
                    <TextInput secureTextEntry value={this.state.password} onChangeText={this.setPassword}/>
                </View>
                <View>
                    <Button title="Sign In" onPress={this.handleSignIn}/>
                </View>
            </View>
        )
    }

    handleSignIn = () => {
        console.log('---', 'sign in', this.state)
    }
}

export default Auth
