import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadEvents } from '../../../ducks/events'
import EventsTable from '../../events/events-table'

class EventsPage extends Component {
  static propTypes = {}

  componentWillMount() {
    this.props.loadEvents()
  }

  render() {
    return (
      <div>
        <h2>Events</h2>
        <EventsTable />
      </div>
    )
  }
}

export default connect(
  null,
  { loadEvents }
)(EventsPage)
