import React, { Component } from 'react'
import { Text, Button, View, Alert } from 'react-native'

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
      <View>
        <Text>
          {event.title}
        </Text>
        <Button title="Close" onPress={this.props.closeHandler} />
        <Button title="Remove" onPress={this.removeHandler} />
      </View>
    )
  }
}
