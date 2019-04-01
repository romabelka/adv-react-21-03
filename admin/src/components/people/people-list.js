import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllPeople, peopleSelector } from '../../ducks/people'
import PersonCard from './person-card'

class PeopleList extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchAllPeople()
  }

  render() {
    return (
      <div>
        {this.props.people.map((person) => (
          <li key={person.id}>
            <PersonCard person={person} />
          </li>
        ))}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    people: peopleSelector(state)
  }),
  { fetchAllPeople }
)(PeopleList)
