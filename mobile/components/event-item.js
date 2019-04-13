import React, { Component } from 'react'
import {TouchableOpacity, FlatList, View, StyleSheet, Text} from 'react-native'
import {withNavigation} from 'react-navigation'


class EventItem extends Component {

    render() {
        const event = this.props.events[this.props.navigation.state.params.eventId]

        return (
          <View style={styles.container}>
              <Text style={styles.field}>{event.id}</Text>
              <Text style={styles.field}>{event.month}</Text>
              <Text style={styles.field}>{event.submissionDeadline}</Text>
              <Text style={styles.field}>{event.title}</Text>
              <Text style={styles.field}>{event.url}</Text>
              <Text style={styles.field}>{event.when}</Text>
              <Text style={styles.field}>{event.where}</Text>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        color: 'rgb(255, 0, 255)',
        fontSize: 30,
        textDecorationLine: 'underline',
        marginBottom: 50,
    },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(100, 15, 24)'
    }
})

export default withNavigation(EventItem)
