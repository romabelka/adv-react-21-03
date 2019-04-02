import React, { Component } from 'react'
import { NavLink, Route } from 'react-router-dom'
import AdminPage from './components/routes/admin'
import AuthPage from './components/routes/auth'
import ProtectedRoute from './components/common/protected-route'
import CustomDragLayer from './components/common/cutom-drag-layer'

export default class App extends Component {
  get menu() {
    return (
      <nav>
        <div>
          <NavLink to="/admin/people" activeStyle={{ color: 'red' }}>
            People List
          </NavLink>
        </div>
        <div>
          <NavLink to="/admin/events" activeStyle={{ color: 'red' }}>
            Event List
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-in" activeStyle={{ color: 'red' }}>
            Sign In
          </NavLink>
        </div>
        <div>
          <NavLink to="/auth/sign-up" activeStyle={{ color: 'red' }}>
            Sign Up
          </NavLink>
        </div>
      </nav>
    )
  }
  render() {
    return (
      <>
        <CustomDragLayer />
        {this.menu}
        <div>
          <ProtectedRoute path="/admin" component={AdminPage} />
          <Route path="/auth" component={AuthPage} />
        </div>
      </>
    )
  }
}
