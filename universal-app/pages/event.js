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
          body: JSON.stringify({ query: `{ event(id: "${id}") { title where url people { firstName id } } }` })
        })

      const { data } = await res.json()

      return {
        id,
        ...data.event
      }
    }

    render() {
        const { id, title, where, url, when, people } = this.props;

        return (
            <div>
                <Link href="/event-list">
                    <a>Event List</a>
                </Link>
                <h1>{title}</h1>
                <div>{where}</div>
                <div>{url}</div>
                <ul>
                  {people && people.map(person => (
                    <li key={person.id}>
                      <Link href={`/people?id=${person.id}`} as={`/person/${person.id}`}>
                        <a>
                          {person.firstName}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
            </div>
        )
    }
}

export default Event
