import React, {Component} from 'react'
import Link from 'next/link'

//import eventQuery from '../queries/event'

class Event extends Component {
    static propTypes = {}

    static async getInitialProps({query: {id}}) {
        const res = await fetch('http://localhost:5000/graphql', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query: `{ event(id: "${id}") { title id where url people {id firstName}  } }`})
        })

        const {data} = await res.json()

        return {
            event: data.event
        }
    }

    render() {
        const {title, id, where, url, people} = this.props.event;
        return (
            <div>
                <Link href="/event-list">
                    <a>Event List</a>
                </Link>
                <div>
                    <p>
                        <span>
                            {where}:
                        </span>
                        <a href={url}>{title}</a>
                    </p>
                    <ul>
                        {
                            people.map(({firstName, id}) =>
                                <li key={id}>
                                    <Link href={`/person/${id}`}>
                                        <a>{firstName}</a>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Event
