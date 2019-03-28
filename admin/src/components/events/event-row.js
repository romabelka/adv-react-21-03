import React, { Component } from 'react'

class EventRow extends Component {
  static propTypes = {}

  render() {
    const { event, handleClick } = this.props
    return (
      <tr
        onClick={() => handleClick(event.id)}
        className="test--event-list__item"
      >
        <td>{event.title}</td>
        <td>{event.when}</td>
        <td>{event.where}</td>
      </tr>
    )
  }
}

export default EventRow
