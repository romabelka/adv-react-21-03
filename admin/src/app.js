import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import PersonPage from './components/routes/person'

class App extends Component {
  static propTypes = {}

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
            <li>
              <NavLink to="/persons" activeStyle={{ color: 'red' }}>
                persons
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Route path="/auth" component={AuthPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/persons" component={PersonPage} />
        </section>
      </div>
    )
  }
}

export default App
