import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthorized } from '../../ducks/auth'
import Authorized from '../../decorators/authorized'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
      </div>
    )
  }
}

export default connect((state) => ({
  isAuthorized: isAuthorized(state)
}))(Authorized(AdminPage))
