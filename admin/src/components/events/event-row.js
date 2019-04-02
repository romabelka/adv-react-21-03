import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './event-drag-preview'

class EventRow extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

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
      id: props.event.id,
      DragPreview
    }
  }
}

const collect = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview()
})

export default DragSource('event', spec, collect)(EventRow)
