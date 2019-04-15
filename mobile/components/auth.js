import React, { Component } from 'react'
import {View, Text, Button, TextInput, Platform} from 'react-native'
import {observer, inject} from 'mobx-react'
import authStore from '../stores/auth'
import IsValidPassword from "./is-valid-password";

@inject('auth')
@observer
class Auth extends Component {
    static propTypes = {

    };

    setEmail = this.props.auth.setEmail
    setPassword = this.props.auth.setPassword

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput keyboardType="email-address" value={this.props.auth.email} onChangeText={this.setEmail}
                               style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput secureTextEntry value={this.props.auth.password} onChangeText={this.setPassword}
                        style={styles.input}
                    />
                    <IsValidPassword/>
                </View>
                <View>
                    <Button title="Sign In" onPress={this.handleSignIn}/>
                </View>
            </View>
        )
    }

    handleSignIn = () => {
        this.props.onSignIn()
        this.props.auth.signIn()
    }
}

const styles = {
    container: { alignContent: 'space-around' },
    text: { fontSize: 25 },
    input: {
        ...Platform.select({
            ios: {
                borderBottomWidth: 1
            },
            android: {

            }
        })
    }
}

export default Auth
