import React, { Component } from 'react'
import { Text, Button, View, Alert, StyleSheet } from 'react-native'

export default class EventPage extends Component {
  removeHandler = () => {
    const { event } = this.props;

    Alert.alert(
      'Are you sure?',
      'Please confirm removing the event',
      [
        { text: 'Yes', onPress: () => this.props.removeHandler(event.id) },
        { text: 'No' }
      ]
    )
  }

  render() {
    const { event } = this.props;

    return (
      <View style={styles.page}>
        <Text style={styles.title}>
          Title: {event.title}
        </Text>
        <Text style={styles.text}>
          Month: {event.month}
        </Text>
        <Text style={styles.text}>
          when: {event.when}
        </Text>
        <Text style={styles.text}>
          where: {event.where}
        </Text>
        <Button style={styles.closeButton} title="Close" onPress={this.props.closeHandler} />
        <Button color="red" style={styles.removeButton} title="Remove" onPress={this.removeHandler} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  page: {
      width: '100%',
      backgroundColor: 'black',
      color: '#fff',
      elevation: 5
  },
  title: {
    color: '#fff',
    fontSize: 24
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})