import React, { Component } from 'react'
import EventsTable from '../../events/events-table'
import PeopleList from '../../people/people-list'
import CustomDragLayer from '../../custom-drag-layer'

class AllLists extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <CustomDragLayer />
        <PeopleList />
        <EventsTable />
      </div>
    )
  }
}

export default AllLists
