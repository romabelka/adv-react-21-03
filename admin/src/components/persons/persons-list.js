import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PersonItem from './person-item'

export default class PersonsList extends Component {
  static propTypes = {
    persons: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string
      })
    )
  }

  render() {
    return (
      <div>
        Persons list:
        {this.props.persons.map((person) => (
          <PersonItem key={person.id} person={person} />
        ))}
      </div>
    )
  }
}
