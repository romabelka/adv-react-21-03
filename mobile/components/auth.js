import React, { Component } from 'react'
import {View, Text, Button, TextInput, Platform} from 'react-native'
import {observable} from 'mobx'
import {observer} from 'mobx-react'

@observer
class Auth extends Component {
    static propTypes = {

    };

    @observable email = ''
    @observable password = ''

    setEmail = (email) => this.email = email
    setPassword = (password) => this.password = password

    render() {
        console.log('---', this.email, this.password)
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput keyboardType="email-address" value={this.email} onChangeText={this.setEmail}
                               style={styles.input}
                    />
                </View>
                <View>
                    <Text style={styles.text}>Password:</Text>
                    <TextInput secureTextEntry value={this.password} onChangeText={this.setPassword}
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
        console.log('---', 'sign in', this.email, this.password)
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
