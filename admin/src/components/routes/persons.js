import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNewPerson, moduleName as personsModule } from '../../ducks/persons'
import AddPersonForm from '../persons/add-person-form'

const Persons = (props) => {
  const handlerSubmitAddNewPerson = (firstName, lastName, email) =>
    props.addNewPerson(firstName, lastName, email)

  return (
    <div>
      Persons:
      <AddPersonForm onSubmit={handlerSubmitAddNewPerson} />
    </div>
  )
}

export default connect(
  (state) => ({
    persons: state[personsModule].persons
  }),
  {
    addNewPerson
  }
)(Persons)
