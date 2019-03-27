import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventsSelector } from '../../ducks/events'
import EventRow from './event-row'

class EventsTable extends Component {
  static propTypes = {}

  render() {
    return this.renderEvents()
  }

  renderEvents() {
    const { events } = this.props
    if (!events || events.length === 0) return <h3>No events</h3>

    return (
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Where</th>
            <th>When</th>
            <th>Month</th>
            <th>Submission Deadline</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    )
  }

  renderRows = () => {
    const { events } = this.props
    return events.map((event) => <EventRow event={event} />)
  }
}

export default connect((state) => ({
  events: eventsSelector(state)
}))(EventsTable)
