import { createAppContainer, createStackNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
// import EventListScreen from './screens/event-list'
import TabNavigator from './tab-navigator'
import EventScreen from './screens/event'

export default createAppContainer(createStackNavigator({
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Auth'
        }
    },
    eventList: {
        screen: TabNavigator
    },
    event: {
        screen: EventScreen
    }
}))
