import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import List from './components/list'
import Private from '../src/components/protectedRoutes/Private'
import Public from '../src/components/protectedRoutes/Public'

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
              <NavLink to="/list" activeStyle={{ color: 'red' }}>
                person list
              </NavLink>
            </li>
          </ul>
        </nav>
        <section>
          <Public path="/auth" component={AuthPage} />
          <Private path="/admin" component={AdminPage} />
          <Private path="/list" component={List} />
        </section>
      </div>
    )
  }
}

export default App
