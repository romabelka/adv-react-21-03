import React, { Component } from 'react'
import {View, Text, Button, TextInput, Platform} from 'react-native'

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
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput keyboardType="email-address" value={this.state.email} onChangeText={this.setEmail}
                               style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput secureTextEntry value={this.state.password} onChangeText={this.setPassword}
                        style={styles.input}
                    />
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
