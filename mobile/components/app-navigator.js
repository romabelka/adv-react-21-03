import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'
import PeopleListScreen from './screens/people-list'
import EventScreen from './screens/event'

const ListsNavigator = createBottomTabNavigator({
    events: {
        screen: EventListScreen
    },
    people: {
        screen: PeopleListScreen
    }
})

export default createAppContainer(createStackNavigator({
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Auth'
        }
    },
    lists: {
        screen: ListsNavigator
    },
    event: {
        screen: EventScreen
    }
}))
