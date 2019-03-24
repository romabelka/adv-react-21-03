import React, { Component } from 'react'
import Persons from './persons'

class AdminPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <Persons />
      </div>
    )
  }
}

export default AdminPage
