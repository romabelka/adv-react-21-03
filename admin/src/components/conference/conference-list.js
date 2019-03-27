import React, { Component } from 'react'
import { connect } from 'react-redux'
import { conferenceSelector } from '../../ducks/conference'
const cellStyle = { border: '1px solid #000', minWidth: '150px' }

class ConferenceList extends Component {
  static propTypes = {}

  render() {
    const { conferences } = this.props

    if (!conferences.length) {
      return <div>Loading</div>
    }

    return (
      <div>
        <table style={{ borderSpacing: 0, marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Site</th>
              <th style={cellStyle}>Location</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Month</th>
              <th style={cellStyle}>Submission Deadline</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((item) => (
              <tr key={item.id} style={cellStyle}>
                <th style={cellStyle}>{item.title}</th>
                <th style={cellStyle}>{item.url}</th>
                <th style={cellStyle}>{item.where}</th>
                <th style={cellStyle}>{item.when}</th>
                <th style={cellStyle}>{item.month}</th>
                <th style={cellStyle}>{item.submissionDeadline}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default connect((state) => ({
  conferences: conferenceSelector(state)
}))(ConferenceList)
