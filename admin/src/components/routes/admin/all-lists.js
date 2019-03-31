import React, { Component } from 'react'
import EventsTable from '../../events/events-table'
import PeopleList from '../../people/people-list'
import Trash from './trash'
import DragLayer from './custom-drag-layer'

class AllLists extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <PeopleList />
        <EventsTable />
        <Trash />
        <DragLayer />
      </div>
    )
  }
}

export default AllLists
