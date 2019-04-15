import React, { Component } from 'react'
import {View, Text, Image, StyleSheet, Button, Alert} from 'react-native'

class Event extends Component {
    static propTypes = {

    };

    render() {
        const {event} = this.props
        return (
            <View style = {styles.container}>
                <Text style = {[styles.text, styles.header]}>{event.title}</Text>
                <View>
                    <Image
                        source={{uri: 'http://lorempixel.com/200/100/technics'}}
                        style={styles.image}
                    />
                    <Text>{event.when}</Text>
                    <Text>{event.where}</Text>
                </View>
                <Text style = {styles.text}>{event.url}</Text>
                <View style = {styles.button}>
                    <Button
                        onPress={this.handleDelete}
                        title="Delete Event"
                        color="#F55"
                    />
                </View>
            </View>
        )
    }

    handleDelete = () => {
        Alert.alert(
            'Delete Confirmation',
            `Are you sure you want to delete ${this.props.event.title}`,
            [
                { text: 'Yes', onPress: () => console.log('delete') },
                { text: 'No', onPress: () => console.log('cancel'), style: 'cancel' }
            ]
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    header: {
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: {
            height: 2,
            width: 0
        },
        elevation: 5
    },
    text: {
        width: '100%',
        height: 100,
        marginBottom: 20,
        textAlign: 'center'
    },
    image: {
        width: 200,
        height: 100
    },
    button: {
        width: '100%',
        height: 100,
        marginBottom: 30
    }
})

export default Event
