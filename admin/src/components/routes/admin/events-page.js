import React, { Component } from 'react'
import EventsTable from '../../events/events-table'
import DraggablePreview from '../../common/draggable-preview'

class EventsPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <DraggablePreview />
        <EventsTable />
      </div>
    )
  }
}

export default EventsPage
