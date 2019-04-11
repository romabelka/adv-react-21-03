import React from 'react';
import { StyleSheet, View } from 'react-native';
//import HelloWorld from './components/hello-world'
import Auth from "./components/auth";
import events from './mocks/events'
import EventList from "./components/event-list";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <EventList events={Object.values(events)}/>
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
});
