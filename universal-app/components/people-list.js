import React from 'react'
import Link from 'next/link'

function PeopleList({ people }) {
    return (
        <ul>
            {people.map(person => <li key={person.id}>
                <Link href={`/person?id=${person.id}`} as={`/person/${person.id}`}>
                    <a>{person.firstName}</a>
                </Link>
            </li>)}
        </ul>
    )
}

PeopleList.propTypes = {
}

export default PeopleList
