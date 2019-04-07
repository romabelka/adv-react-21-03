import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Event from "./event";

export const FETCH_ALL_EVENTS = gql`
    { 
        allEvents { title id } 
    }
`

export const newEventAdded = callback=> (cache,{data: {addEvent}})=>{
    const {allEvents} = cache.readQuery({query: FETCH_ALL_EVENTS})
    cache.writeQuery({
        query: FETCH_ALL_EVENTS,
        data: {allEvents: [addEvent, ...allEvents]}
    })

    callback()
}

class EventList extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Query query={FETCH_ALL_EVENTS}>
                {
                    ({ data, loading }) => {
                        if (loading) return <h1>Loading</h1>

                        return (
                            <ul>
                                {data.allEvents.map(event => <li key={event.id}>
                                    <Event event={event} />
                                </li>)}
                            </ul>
                        )
                    }
                }
            </Query>
        )
    }
}

export default EventList
