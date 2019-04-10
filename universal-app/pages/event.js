import React, { Component } from 'react'
import Link from 'next/link'
import eventQuery from '../queries/event'
import {print} from 'graphql'

class Event extends Component {
    static propTypes = {

    }

    static async getInitialProps({ query: { id } }) {
        const res = await fetch('http://localhost:5000/graphql' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: print(eventQuery), variables: { id } })
        })

        const { data } = await res.json()

        return {
            event: data.event
        }
    }

    render() {
        return (
            <div>
                <Link href="/event-list">
                    <a>Event List</a>
                </Link>
                <h1>{this.props.event.title}</h1>
                <div>
                    {this.props.event.people.map(person => (
                        <div key={person.id}>
                            <Link href={`/person?id=${person.id}`} as={`/person/${person.id}`}>
                                <a>{person.firstName}</a>
                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        )
    }
}

export default Event
