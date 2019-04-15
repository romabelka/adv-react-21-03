import React from 'react'
import EventList from '../events/event-list'
import events from '../../mocks/events'

function EventListScreen() {
    return <EventList events={Object.values(events)}/>
}

export default EventListScreen
