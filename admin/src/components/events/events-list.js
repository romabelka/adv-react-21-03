import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class EventsList extends Component {
  static propTypes = {
    events: PropTypes.arrayOf({})
  }

  render() {
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <td>Title</td>
              <td>Where</td>
              <td>When</td>
              <td>Month</td>
              <td>Submission dead line</td>
              <td>Url</td>
            </tr>
          </thead>
          <tbody>
            {this.props.events.map((event) => (
              <tr key={event.title}>
                <td>{event.title}</td>
                <td>{event.where}</td>
                <td>{event.when}</td>
                <td>{event.month}</td>
                <td>{event.submissionDeadline}</td>
                <td>{event.url}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}
