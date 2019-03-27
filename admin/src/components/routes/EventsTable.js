import React, { Component } from 'react'
import { connect } from 'react-redux'
import ApiService from '../../services/api'
import { getEvents, eventsSelector } from '../../ducks/events'

class EventsTable extends Component {
  async componentDidMount() {
    this.props.getEvents()
    //  const list = await ApiService.getEvents();
    //  this.setState({list});
  }

  render() {
    return (
      <>
        {this.props.events.state === 'loaded' && (
          <table>
            <tbody>
              {this.props.events.list.map(
                ({ month, submissionDeadline, title, url, when, where }, i) => (
                  <tr key={i}>
                    <td>{month}</td>
                    <td>{submissionDeadline}</td>
                    <td>{title}</td>
                    <td>{url}</td>
                    <td>{when}</td>
                    <td>{where}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
        {this.props.events.state === 'loading' && (
          <h1>Fetching events from DB</h1>
        )}
        {this.props.events.error && <h1>{this.props.events.error}</h1>}
      </>
    )
  }
}

export default connect(
  (state) => ({
    events: eventsSelector(state)
  }),
  {
    getEvents
  }
)(EventsTable)
