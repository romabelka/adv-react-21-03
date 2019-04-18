import React from 'react'
import EventList from '../events/event-list'

function EventListScreen({ navigation }) {
    const handleEventPress = ({id, title}) => navigation.navigate('event', { id, title })
    return <EventList onEventPress = {handleEventPress} />
}

EventListScreen.navigationOptions = {
    title: 'events list'
}

export default EventListScreen
