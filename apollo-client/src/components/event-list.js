import React, {Component} from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Event from "./event";

export const AllEvents = gql`
    { 
        allEvents { title id } 
    }
`

class EventList extends Component {
  static propTypes = {}

  render() {
    return (
      <Query query={AllEvents}>
        {
          ({data, loading}) => {
            if (loading) return <h1>Loading</h1>

            return (
              <ul>
                {data.allEvents.map(event => <li key={event.id}>
                  <Event event={event}/>
                </li>)}
              </ul>
            )
          }
        }
      </Query>
    )
  }
}

export default EventList
