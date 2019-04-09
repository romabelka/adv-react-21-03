import React, { Component } from 'react'
import Link from 'next/link'

class PersonList extends Component {
    static propTypes = {

    }

    static async getInitialProps({}) {
        const res = await fetch('http://localhost:5000/graphql' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '{ allPeople { firstName id } }' })
        })

        const { data } = await res.json()

        return {
            people: data.allPeople
        }
    }

    render() {
        return (
            <ul>
                {this.props.people.map(person => <li key={person.id}>
                    <Link href={`/person?id=${person.id}`} as={`/person/${person.id}`}>
                        <a>{person.firstName}</a>
                    </Link>
                </li>)}
            </ul>
        )
    }
}

export default PersonList
