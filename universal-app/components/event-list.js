import React, { Component } from 'react'
import { Query } from 'react-apollo'
import Event from "./event";
import query from '../queries/event-list'

class EventList extends Component {
    static propTypes = {

    }

    render() {
        return (
            <Query query={query}>
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
