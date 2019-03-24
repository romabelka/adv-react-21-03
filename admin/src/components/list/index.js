import React, { Component } from 'react'
import { connect } from 'react-redux'
import { personList } from '../../ducks/addPerson'

class List extends Component {
  render() {
    if (this.props.personList) {
      return (
        <ul>
          {this.props.personList.map((person, i) => (
            <li key={i}>
              <ul>
                <li>{person.name}</li>
                <li>{person.surname}</li>
                <li>{person.email}</li>
              </ul>
            </li>
          ))}
        </ul>
      )
    } else {
      return <h1>No one on the list yet</h1>
    }
  }
}

export default connect((state) => ({
  personList: personList(state)
}))(List)
