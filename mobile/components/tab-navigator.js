import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import EventListScreen from './event-list';
import HelloWorld from './hello-world';

const TabNavigator = createBottomTabNavigator({
  Events: EventListScreen,
  Home: HelloWorld
})

export default createAppContainer(TabNavigator)