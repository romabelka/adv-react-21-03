import React, { useState, useCallback } from 'react'
import { Field, reduxForm } from 'redux-form'

export default function AdminPage() {
  const [people, setState] = useState([])
  const addPerson = useCallback(
    (person) => {
      setState([...people, person])
    },
    [people, setState]
  )

  return (
    <>
      <People people={people} />
      <AddPerson key={people.length} onSubmit={addPerson} />
    </>
  )
}

const AddPerson = reduxForm({
  form: 'addPerson'
})(function AddPerson({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field name="firstName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <Field name="lastName" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="phone">Phone</label>
        <Field name="phone" component="input" type="tel" />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
})

function People({ people }) {
  return (
    <ul>
      {people.map((person) => (
        <li key={person.phone}>
          {person.firstName} {person.lastName} - {person.phone}
        </li>
      ))}
    </ul>
  )
}
