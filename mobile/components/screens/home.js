import { createAppContainer, createMaterialTopTabNavigator } from 'react-navigation'
import EventListScreen from './event-list'
import PersonListScreen from './person-list'

export default createAppContainer(createMaterialTopTabNavigator({
  eventList: {
    screen: EventListScreen,
    navigationOptions: {
      title: 'Events'
    },
  },
  personList: {
    screen: PersonListScreen,
    navigationOptions: {
      title: 'People'
    },
  },
}, {
  lazy: true
}))
