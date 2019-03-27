import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getEvents, eventsSelector } from '../../../ducks/events'
import EventsList from '../../events/events-list'

class PersonPage extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.getEvents()
  }

  render() {
    return (
      <div>
        <h2>Events</h2>
        <EventsList events={this.props.events} />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      events: eventsSelector(state)
    }
  },
  { getEvents }
)(PersonPage)
