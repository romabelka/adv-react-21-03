import { createAppContainer, createStackNavigator } from 'react-navigation'
import AuthScreen from './screens/auth'
import HomeScreen from './screens/home'

export default createAppContainer(createStackNavigator({
    auth: {
        screen: AuthScreen,
        navigationOptions: {
            title: 'Auth'
        },
    },
    home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home'
        },
    }
}))
