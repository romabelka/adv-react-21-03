import React, { Component } from 'react'
import Link from 'next/link'
import eventQuery from '../queries/event'
import {Query} from "react-apollo";
import Loader from "../components/loader";

class EventPage extends Component {
    static propTypes = {

    }

    static getInitialProps({ query: { id } }) {
        return { id }
    }

    render() {
        return (
            <div>
                <Link href="/event-list">
                    <a>Event List</a>
                </Link>
                <Query query={eventQuery} variables={{ id: this.props.id }}>
                    {({loading, data}) => loading
                        ? <Loader/>
                        : this.getEvent(data.event)
                    }
                </Query>
            </div>
        )
    }

    getEvent = event => (
        <div>
            <h3>{event.title}</h3>
            <ul>
                {event.people.map(person =>
                    <li key={person.id}>
                        <Link href={`/person?id=${person.id}`} as={`/person/${person.id}`}>
                            {person.firstName}
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default EventPage
