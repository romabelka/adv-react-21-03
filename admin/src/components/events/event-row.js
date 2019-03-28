import React, { Component } from 'react'
import { DragSource } from 'react-dnd'

class EventRow extends Component {
  static propTypes = {}

  render() {
    const { event, handleClick, dragSource, isDragging } = this.props
    return dragSource(
      <tr
        onClick={() => handleClick(event.id)}
        style={{ opacity: isDragging ? 0.2 : 1 }}
        className="test--event-list__item"
      >
        <td>{event.title}</td>
        <td>{event.when}</td>
        <td>{event.where}</td>
      </tr>
    )
  }
}

const spec = {
  beginDrag(props) {
    return {
      id: props.event.id
    }
  }
}

const collect = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default DragSource('event', spec, collect)(EventRow)
