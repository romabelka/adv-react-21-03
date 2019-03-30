import React, { Component } from 'react'
import { DragSource } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend'

class EventRow extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true
    })
  }

  render() {
    const { event, handleClick, isDragging, connectDragSource } = this.props
    return (
      <>
        <tr
          ref={connectDragSource}
          onClick={() => handleClick(event.id)}
          style={{ opacity: isDragging ? 0.2 : 1 }}
          className="test--event-list__item"
        >
          <td>{event.title}</td>
          <td>{event.when}</td>
          <td>{event.where}</td>
        </tr>
      </>
    )
  }
}

EventRow.propTypes = {}

const spec = {
  beginDrag(props) {
    return {
      id: props.event.id,
      title: props.event.title
    }
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default DragSource('event', spec, collect)(EventRow)
