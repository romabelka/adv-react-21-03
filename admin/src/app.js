import React, { Component } from 'react'
import { Route, NavLink } from 'react-router-dom'
import AuthPage from './components/routes/auth'
import AdminPage from './components/routes/admin'
import AuthorizedRoute from './components/routes/authorized-route'

class App extends Component {
  static NonAuthorizedAdmin = () => <h1>Not Authorized</h1>

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
          </ul>
        </nav>
        <section>
          <Route path="/auth" component={AuthPage} />
          <Route path="/admin" component={AdminPage} />
          {/*<AuthorizedRoute*/}
          {/*path="/admin"*/}
          {/*AuthorizedComponent={AdminPage}*/}
          {/*NonAuthorizedComponent={App.NonAuthorizedAdmin}*/}
          {/*/>*/}
        </section>
      </div>
    )
  }
}

export default App
