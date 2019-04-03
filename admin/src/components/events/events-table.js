import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  eventListSelector,
  loadedSelector,
  loadingSelector,
  selectEvent
} from '../../ducks/events'
import Loader from '../common/loader'
import EventRow from './event-row'

export class EventsTable extends Component {
  static propTypes = {}

  render() {
    if (this.props.loading) return <Loader />
    return (
      <table>
        <tbody>{this.getRows()}</tbody>
      </table>
    )
  }

  getRows = () => this.props.events.map(this.getRow)

  getRow = (event) => (
    <EventRow
      event={event}
      handleClick={this.props.selectEvent}
      key={event.id}
    />
  )
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { selectEvent }
)(EventsTable)
