import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
//import HelloWorld from './components/hello-world'
import Auth from "./components/auth";
import events from './mocks/events'
import EventList from "./components/event-list";
import EventPage from "./components/event-page";

export default class App extends React.Component {
  state = {
    openedEvent: null,
    events
  }

  clickEventHandler = (event) => {
    this.setState({
      openedEvent: event,
    })
  }

  closeEventHandler = () => {
    this.setState({
      openedEvent: null
    })
  }

  removeEventHandler = (eventId) => {
    const newEvents = { ...events}

    delete newEvents[eventId]

    this.setState({
      events: newEvents,
      openedEvent: null
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.image} resizeMode={'contain'}/>
        {this.state.openedEvent
          ? <EventPage event={this.state.openedEvent} removeHandler={this.removeEventHandler} closeHandler={this.closeEventHandler}/>
          : <EventList onClickEvent={this.clickEventHandler} events={Object.values(this.state.events)}/>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 100
  }
});
