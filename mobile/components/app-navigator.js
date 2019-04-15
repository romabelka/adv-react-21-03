import { createAppContainer, createStackNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import EventListScreen from './screens/event-list'

export default createAppContainer(createStackNavigator({
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Auth'
        }
    },
    eventList: {
        screen: EventListScreen
    }
}))
