import React from 'react'
import Event from '../events/event'
import events from '../../mocks/events'

function EventScreen({ navigation }) {
    return <Event event={events[navigation.state.params.id]}/>
}

EventScreen.navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title
})

export default EventScreen
