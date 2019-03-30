import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

class EventRow extends Component {
  static propTypes = {}

  componentDidMount() {
    const { connectDragPreview } = this.props

    if (connectDragPreview) {
      connectDragPreview(getEmptyImage(), {
        captureDraggingState: true
      })
    }
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
      title: props.event.title
    }
  }
}

const collect = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default DragSource('event', spec, collect)(EventRow)
