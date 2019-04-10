import React, { Component } from 'react'
import Link from 'next/link'

class Person extends Component {
    static propTypes = {

    }


    static async getInitialProps({ query: { id } }) {
        const res = await fetch('http://localhost:5000/graphql' , {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: `{ person(id:${id}) { id firstName } }` })
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
                    <a>All person List</a>
                </Link>
                <h1>{this.props.person.firstName}</h1>
            </div>
        )
    }
}

export default Person
