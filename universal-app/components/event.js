import React, { useState } from 'react'
import {Query} from 'react-apollo'
import PersonForm from './person-form'
import query from '../queries/event'

function Event({ event }) {
    const [isOpen, setOpen] = useState(true)

    return (
        <div>
            <h3 onClick={() => setOpen(!isOpen)}>{event.title}</h3>
            {isOpen && getBody(event)}
        </div>
    )
}

function getBody(event) {
    return (
        <Query query={query} variables={{ id: event.id }}>
            {
                ({ data, loading }) => {
                    if (loading) return <h3>Loading...</h3>

                    return (
                        <>
                            <p>{data.event.where}</p>
                            <p>{data.event.url}</p>
                            <div>
                                {data.event.people.map(person => person.firstName).join('; ')}
                                {getPeopleForms(data.event.people)}
                            </div>
                        </>
                    )
                }
            }
        </Query>
    )
}

function getPeopleForms(people) {
    return people.map(person => <PersonForm key={person.id} person={person}/>)
}

export default Event
