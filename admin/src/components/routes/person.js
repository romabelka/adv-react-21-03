import React from 'react'
import PersonForm from '../person/person-form'
import PersonList from '../person/person-list'
import Authorized from '../../decorators/authorized'

import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPerson } from '../../ducks/person'
import { push } from 'connected-react-router'
import { isAuthorized } from '../../ducks/auth'

class PersonPage extends React.Component {
  render() {
    return (
      <div>
        <h3>Persons Page</h3>
        <Route
          path="/persons"
          exact="true"
          render={() => (
            <div>
              <button onClick={this.handleGoToPersonForm}>Add person</button>
              <PersonList />
            </div>
          )}
        />
        <Route
          path="/persons/new"
          exact="true"
          render={() => <PersonForm onSubmit={this.handleCreatePerson} />}
        />
      </div>
    )
  }

  handleCreatePerson = ({ email, firstName, lastName }) =>
    this.props.createPerson(firstName, lastName, email)
  handleGoToPersonForm = () => this.props.push('/persons/new')
}

export default connect(
  (state) => ({
    isAuthorized: isAuthorized(state)
  }),
  {
    createPerson,
    push
  }
)(Authorized(PersonPage))
