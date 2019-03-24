import React from 'react'

const PersonListRow = ({ person }) => (
  <li key={person.email}>
    {person.firstName} {person.email}
  </li>
)

export default PersonListRow
