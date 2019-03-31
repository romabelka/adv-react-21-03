import React, { Component } from 'react'
import EventsTable from '../../events/events-table'
import PeopleList from '../../people/people-list'
import Trash from './trash'

class AllLists extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <PeopleList />
        <EventsTable />
        <Trash />
      </div>
    )
  }
}

export default AllLists
