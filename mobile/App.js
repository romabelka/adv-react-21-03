import React from 'react';
import events from './mocks/events'
import EventList from "./components/event-list";
import EventItem from "./components/event-item";
import { createStackNavigator, createAppContainer } from 'react-navigation'
export const {Provider, Consumer} = React.createContext([])


const AppNavigator = createStackNavigator({
  Home: {
    screen: () => <EventList/>,
    navigationOptions: () => ({
      title: `Event List`,
    })
  },
  Event: {
    screen: () => <EventItem/>,
    navigationOptions: () => ({
      title: `Event Item`,
    })
  }
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  state = {
    events,
  }

  deleteEvent = (id) => {
      const eventsCopy = {...this.state.events}
      delete eventsCopy[id]
      this.setState({events: eventsCopy})
  }

  render() {
    return (
      <Provider value={{
        events: this.state.events,
        deleteEvent: this.deleteEvent
      }}>
        <AppContainer />
      </Provider>
    );
  }
}
