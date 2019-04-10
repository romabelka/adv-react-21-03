import React, { Component } from 'react'
import Link from 'next/link'
//import eventQuery from '../queries/event'

class People extends Component {
    static propTypes = {

    }

    static async getInitialProps({ query: { id } }) {
        const res = await fetch('http://localhost:5000/graphql' , {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: `{ person(id: ${id}) { firstName events { title id } } }` })
        })

        const { data } = await res.json()

        return {
          id,
          ...data.person
        }
    }

    render() {
        console.log(this.props)
        const { id, firstName, events } = this.props;

        return (
            <div>
                <Link href="/people-list">
                    <a>People List</a>
                </Link>
                <h1>{id} {firstName}</h1>
                {events && events.map(event => (
                  <div key={event.id}>
                    <Link href={`/event?id=${event.id}`} as={`/event/${event.id}`} >
                      <a>
                        {event.title}
                      </a>
                    </Link>
                  </div>
                ))}
            </div>
        )
    }
}

export default People
