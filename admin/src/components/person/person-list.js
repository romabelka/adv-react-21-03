import React from 'react'
import { connect } from 'react-redux'
import { getPersons } from '../../ducks/person'
import PersonListRow from './person-list-row'

export class PersonList extends React.Component {
  render() {
    return this.renderPersons()
  }

  renderPersons = () => {
    const { persons } = this.props

    if (!persons || persons.length === 0) return <h3>No persons</h3>
    return (
      <ul>
        {persons.map((person) => (
          <PersonListRow person={person} />
        ))}
      </ul>
    )
  }
}

export default connect((state) => ({
  persons: getPersons(state)
}))(PersonList)
