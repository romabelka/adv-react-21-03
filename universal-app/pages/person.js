import React, { Component } from 'react'
import Link from 'next/link'

class Event extends Component {
    static propTypes = {

    }

    static getInitialProps({ query: { id } }) {
        return { id }
    }

    render() {
        return (
            <div>
                <Link href="/person-list">
                    <a>Person List</a>
                </Link>
                <h1>{this.props.id}</h1>
            </div>
        )
    }
}

export default Event
