import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PersonPage from './person-page'
import EventsPage from './events-page'
import AllListsPage from './all-lists'
import Trash from '../../common/trash'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <Trash />
        <Route path="/admin/people" component={PersonPage} />
        <Route path="/admin/events" component={EventsPage} />
        <Route path="/admin/all" component={AllListsPage} />
      </div>
    )
  }
}

export default AdminPage
