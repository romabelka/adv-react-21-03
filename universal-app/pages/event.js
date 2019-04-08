import React, { Component } from 'react'
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
                <h1>{this.props.id}</h1>
            </div>
        )
    }
}

export default Event
