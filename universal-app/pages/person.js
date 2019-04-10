import React, { Component } from 'react'
import Link from 'next/link'
import personQuery from '../queries/person'
import {print} from 'graphql'

class Person extends Component {
    static propTypes = {

    }

    static async getInitialProps({ query: { id } }) {

        const res = await fetch('http://localhost:5000/graphql' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: print(personQuery), variables: { id } })
        })

        const { data } = await res.json()

        return {
            person: data.person
        }
    }

    render() {
        return (
            <div>
                <Link href="/person-list">
                    <a>Event List</a>
                </Link>
                <h1>{this.props.person.firstName}</h1>
            </div>
        )
    }
}

export default Person
