import React, { Component } from 'react'
import { connect } from 'react-redux'
import { eventSelector, getEvents } from '../../../ducks/events'

class PersonPage extends Component {
  static propTypes = {}
  componentDidMount() {
    this.props.getEvents()
  }
  render() {
    const { events } = this.props
    return (
      <div>
        <h2>Events</h2>
        {events &&
          events.map((i) => {
            const { id, url, title, when, where } = i
            return (
              <div key={id}>
                <a href={url}>{title}</a>
                <span>{`when: ${when}  where: ${where}`}</span>
              </div>
            )
          })}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    events: eventSelector(state)
  }),
  { getEvents }
)(PersonPage)
