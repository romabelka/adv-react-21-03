import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { isAuthorized } from './ducks/auth'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import notAuthPage from './components/common/notAuth'

class App extends Component {
  static propTypes = {}

  render() {
    const { isAuthorized } = this.props
    const protectedPage = (component) =>
      isAuthorized ? component : notAuthPage

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
          <Route path="/admin" component={protectedPage(AdminPage)} />
        </section>
      </div>
    )
  }
}

export default connect((state) => ({
  isAuthorized: isAuthorized(state)
}))(App)
