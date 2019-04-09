import React, { Component } from 'react'
import Link from 'next/link'
//import eventQuery from '../queries/event'

class Event extends Component {
    static propTypes = {

    }

    static async getInitialProps({ query: { id } }) {
      const res = await fetch('http://localhost:5000/graphql' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `{ event(id: "${id}") { title id people {id firstName} } }` })
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
                <h1>{this.props.event.id}</h1>
                <h1>{this.props.event.title}</h1>
              <ul>
                {this.props.event.people.map(person => (<Link href={`/person/${person.id}`}>
                  <a>{person.firstName}</a>
                </Link>))}
              </ul>
            </div>
        )
    }
}

export default Event
