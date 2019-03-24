import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddUserForm from '../auth/add-user-form'
import { addUser, getList } from '../../ducks/spreadsheet'

const cellStyle = { border: '1px solid #000', minWidth: '150px' }

class SpreadsheetPage extends Component {
  static propTypes = {}

  render() {
    const { list } = this.props

    return (
      <div>
        <h1>Spreadsheet</h1>
        <AddUserForm addUser={this.handleAddUser} />
        <table style={{ borderSpacing: 0, marginTop: '20px' }}>
          <tr>
            <th style={cellStyle}>First name</th>
            <th style={cellStyle}>Last name</th>
            <th style={cellStyle}>Email</th>
          </tr>
          {list.map((item) => (
            <tr key={item.email} style={cellStyle}>
              <td style={cellStyle}>{item.firstname}</td>
              <td style={cellStyle}>{item.lastname}</td>
              <td style={cellStyle}>{item.email}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }

  handleAddUser = ({ firstname, lastname, email }) =>
    this.props.addUser(firstname, lastname, email)
}

export default connect(
  (fullState) => ({
    list: getList(fullState) || []
  }),
  {
    addUser
  }
)(SpreadsheetPage)
