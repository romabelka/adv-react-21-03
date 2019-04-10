import React, { Component } from 'react';
import Link from 'next/link'

class PeopleList extends Component {
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
      <div>
        People
        <ul>
          {this.props.people.map(person => (
            <li key={person.id}>
              <Link href={`/people?id=${person.id}`} as={`/people/${person.id}`} >
                <a>
                  {person.firstName}
                </a>
              </Link>
            </li>))
          }
        </ul>
      </div>
    );
  }
}

export default PeopleList;
