import React, { Component } from 'react'
import EventsTable from '../../events/events-table'
import PeopleList from '../../people/people-list'

class AllLists extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <PeopleList />
        <EventsTable />
      </div>
    )
  }
}

export default AllLists
