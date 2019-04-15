import React, { Component } from 'react'
import {View, Text, Button, TextInput, Platform} from 'react-native'
import {observer} from 'mobx-react'
import authStore from '../stores/auth'

@observer
class Auth extends Component {
    static propTypes = {

    };

    setEmail = authStore.setEmail
    setPassword = authStore.setPassword

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput keyboardType="email-address" value={authStore.email} onChangeText={this.setEmail}
                               style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput secureTextEntry value={authStore.password} onChangeText={this.setPassword}
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
        this.props.onSignIn()
        authStore.signIn()
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
