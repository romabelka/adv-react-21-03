import React from 'react'
import Auth from '../auth'

function AuthScreen({ navigation }) {
    return <Auth onSignIn = {() => navigation.navigate('eventList')}/>
}

export default AuthScreen
