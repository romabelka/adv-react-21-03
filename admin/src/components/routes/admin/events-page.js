import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventPageLoaded, eventsSelector } from '../../../ducks/events'

class PersonPage extends Component {
  componentDidMount() {
    this.props.eventPageLoaded()
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <td>month</td>
            <td>submissionDeadline</td>
            <td>title</td>
            <td>url</td>
            <td>when</td>
            <td>where</td>
          </tr>
        </thead>
        <tbody>
          {this.props.events.map((event) => (
            <tr key={event.id}>
              <td>{event.month}</td>
              <td>{event.submissionDeadline}</td>
              <td>{event.title}</td>
              <td>{event.url}</td>
              <td>{event.when}</td>
              <td>{event.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return { events: eventsSelector(state) }
}

export default connect(
  mapStateToProps,
  { eventPageLoaded }
)(PersonPage)
