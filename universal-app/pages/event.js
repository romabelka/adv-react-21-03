import React, { Component } from 'react'
import Link from 'next/link'
//import eventQuery from '../queries/event'

class Event extends Component {
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
                <h1>{this.props.id}</h1>
            </div>
        )
    }
}

export default Event
