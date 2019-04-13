import React from 'react';
import events from './mocks/events'
import EventList from "./components/event-list";
import EventItem from "./components/event-item";
import { createStackNavigator, createAppContainer } from 'react-navigation'
import {Text} from 'react-native'

const AppNavigator = createStackNavigator({
  Home: {
    screen: () => <EventList events={Object.values(events)}/>,
    navigationOptions: () => ({
      title: `Event List`,
    })
  },
  Event: {
    screen: () => <EventItem events={events}/>,
    navigationOptions: () => ({
      title: `Event Item`,
    })
  }
})

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer
