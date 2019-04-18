import React from 'react'
import Auth from '../auth'

function AuthScreen({ navigation }) {
    return <Auth onSignIn = {() => navigation.navigate('lists')}/>
}

export default AuthScreen
