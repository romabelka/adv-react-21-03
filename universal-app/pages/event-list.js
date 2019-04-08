import React, { Component } from 'react'
import Link from 'next/link'

class EventList extends Component {
    static propTypes = {

    }

    static async getInitialProps({}) {
        const res = await fetch('http://localhost:5000/graphql' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ allEvents { title id } }' })
        })

        const { data } = await res.json()

        return {
            events: data.allEvents
        }
    }

    render() {
        return (
            <ul>
                {this.props.events.map(event => <li key={event.id}>
                    <Link href={`/event?id=${event.id}`} as={`/event/${event.id}`}>
                        <a>{event.title}</a>
                    </Link>
                </li>)}
            </ul>
        )
    }
}

export default EventList
