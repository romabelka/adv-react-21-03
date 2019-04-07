import React from 'react'
import EventList from "./event-list";
import NewEventForm from "./new-event-form";


function EventPage() {
    return (
        <>
            <NewEventForm/>
            <EventList/>
            </>
    )
}

export default EventPage