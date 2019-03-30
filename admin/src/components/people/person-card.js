import React, { Component } from 'react'
import { DropTarget, DragSource } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/people'

class PersonCard extends Component {
  static propTypes = {}

  render() {
    const { person, dropTarget, canDrop, isOver, dragSource } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'
    return dragSource(
      <div style={{ border: `1px solid ${borderColor}` }}>
        {person.email}: {person.firstName}
        {dropTarget(<div>Drop Here</div>)}
      </div>
    )
  }
}

const specDragTarget = {
  drop(props, monitor) {
    props.addPersonToEvent(props.person.id, monitor.getItem().id)
  }
}

const collectDragTarget = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

const specDragSource = {
  beginDrag(props) {
    return {
      email: props.person.email,
      firstName: props.person.firstName
    }
  }
}

const collectDragSource = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

export default connect(
  null,
  { addPersonToEvent }
)(
  DragSource('person', specDragSource, collectDragSource)(
    DropTarget(['event'], specDragTarget, collectDragTarget)(PersonCard)
  )
)
