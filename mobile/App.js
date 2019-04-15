import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
//import HelloWorld from './components/hello-world'
//import Auth from "./components/auth";
import events from './mocks/events'
//import EventList from "./components/events/event-list";
import Event from "./components/events/event";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.image} resizeMode={'contain'}/>
        <Event event={Object.values(events)[0]}/>
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
