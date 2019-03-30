import React, { Component } from 'react'
import EventsTable from '../../events/events-table'
import PeopleList from '../../people/people-list'
import CustomDragLayer from '../../custom-drag-layer'
import Trash from '../../trash'

class AllLists extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <Trash />
        <CustomDragLayer />
        <PeopleList />
        <EventsTable />
      </div>
    )
  }
}

export default AllLists
