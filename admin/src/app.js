import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import authControl from './components/authControl'
import { fetchUser } from './ducks/auth'

class App extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchUser()
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/auth" activeStyle={{ color: 'red' }}>
                auth
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeStyle={{ color: 'red' }}>
                admin
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Route path="/auth" component={AuthPage} />
          <Route
            path="/admin"
            component={authControl(AdminPage, true, '/auth/sign-in')}
          />
        </section>
      </div>
    )
  }
}

export default connect(
  null,
  {
    fetchUser
  }
)(App)
