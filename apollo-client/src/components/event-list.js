import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const query = gql`
    { 
        allEvents { title id } 
    }
`

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
                                    {event.title}
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
