import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import uid from 'uid'
import { addNewPerson, moduleName as personsModule } from '../../ducks/persons'
import AddPersonForm from '../persons/add-person-form'
import PersonsList from '../persons/persons-list'

const Persons = (props) => {
  const handlerSubmitAddNewPerson = (newPersonData) => {
    props.addNewPerson({
      ...newPersonData,
      id: uid()
    })
  }

  return (
    <div>
      Persons:
      <AddPersonForm onSubmit={handlerSubmitAddNewPerson} />
      <PersonsList persons={props.persons} />
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
