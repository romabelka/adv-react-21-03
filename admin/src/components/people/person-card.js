import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/events'
import { getEmptyImage } from 'react-dnd-html5-backend'
import DragPreview from './person-drag-preview'

class PersonCard extends Component {
  static propTypes = {}
  componentDidMount() {
    this.props.connectPreview(getEmptyImage())
  }

  render() {
    const { person, dropTarget, dragSource, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'
    return dragSource(
      <div style={{ border: `1px solid ${borderColor}` }}>
        {person.email}: {person.firstName}
        {dropTarget(<div>Drop Here</div>)}
      </div>
    )
  }
}

const dropSpec = {
  drop(props, monitor) {
    props.addPersonToEvent(props.person.id, monitor.getItem().id)
  }
}

const dropCollect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

const dragSpec = {
  beginDrag(props) {
    return {
      id: props.person.id,
      DragPreview
    }
  }
}

const dragCollect = (connect) => ({
  dragSource: connect.dragSource(),
  connectPreview: connect.dragPreview()
})

export default connect(
  null,
  { addPersonToEvent }
)(
  DropTarget(['event'], dropSpec, dropCollect)(
    DragSource('person', dragSpec, dragCollect)(PersonCard)
  )
)
