import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthorized } from '../../ducks/auth'
import { addPerson } from '../../ducks/addPerson'
import AddPerson from '../adminForms/AddPerson'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    if (!this.props.isAuthorized) return <h1>Not Authorized</h1>
    return (
      <div>
        <h1>Admin</h1>
        <AddPerson onSubmit={this.handleAddPerson} />
      </div>
    )
  }
  handleAddPerson = ({ name, surname, email }) =>
    this.props.addPerson(name, surname, email)
}

export default connect(
  (state) => ({
    isAuthorized: isAuthorized(state)
  }),
  {
    addPerson
  }
)(AdminPage)
