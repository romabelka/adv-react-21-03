import React, { Component } from 'react'
import {Button, View, StyleSheet, Text, Alert} from 'react-native'
import {withNavigation} from 'react-navigation'
import {Consumer} from '../App'

class EventItem extends Component {

  showConfirmationModal = (deleteEvent) => {
    Alert.alert(
      'Event deletion',
      'Are you sure you want to delete event?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {
            deleteEvent(this.props.navigation.state.params.eventId)
            this.props.navigation.navigate("Home")
          }},
      ],
      {cancelable: false},
    );
  }

    render() {
        return (
          <Consumer>{({events, deleteEvent}) => {
            const event = events[this.props.navigation.state.params.eventId]
            if (!event) {
              return null
            }
            return (
              <View style={styles.container}>
                <Button title="Delete event" onPress={() => this.showConfirmationModal(deleteEvent)}/>
                <View style={styles.row}><Text style={styles.field}>{event.id}</Text></View>
                <View style={styles.row}><Text style={styles.field}>{event.month}</Text></View>
                <View style={styles.row}><Text style={styles.field}>{event.title}</Text></View>
                <View style={styles.row}><Text style={styles.field}>{event.url}</Text></View>
                <View style={styles.row}><Text style={styles.field}>{event.when}</Text></View>
                <View style={styles.row}><Text style={styles.field}>{event.where}</Text></View>
              </View>
            )
          }}</Consumer>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        color: 'rgb(255, 0, 255)',
        fontSize: 30,
        textDecorationLine: 'underline',
    },
  row: {
    marginBottom: 50,
  },
    container: {
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(100, 15, 24)'
    }
})

export default withNavigation(EventItem)
