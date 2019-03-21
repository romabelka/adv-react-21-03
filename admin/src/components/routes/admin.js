import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isAuthorized } from '../../ducks/auth'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    if (!this.props.isAuthorized) return <h1>Not Authorized</h1>
    return (
      <div>
        <h1>Admin</h1>
      </div>
    )
  }
}

export default connect((state) => ({
  isAuthorized: isAuthorized(state)
}))(AdminPage)
