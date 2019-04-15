import React from 'react'
import EventList from '../events/event-list'
import events from '../../mocks/events'

function EventListScreen({ navigation }) {
    const handleEventPress = ({id, title}) => navigation.navigate('event', { id, title })
    return <EventList events={Object.values(events)} onEventPress = {handleEventPress} />
}

EventListScreen.navigationOptions = {
    title: 'events list'
}

export default EventListScreen
