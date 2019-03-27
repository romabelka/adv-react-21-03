import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'
import ConferencePage from './conference-page'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Route path="/admin/people" component={PersonPage} />
        <Route path="/admin/conference" component={ConferencePage} />
      </div>
    )
  }
}

export default AdminPage
