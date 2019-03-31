import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/people'

class PersonCard extends Component {
  static propTypes = {}

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

const spec = {
  drop(props, monitor) {
    props.addPersonToEvent(props.person.id, monitor.getItem().id)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  isOver: monitor.isOver()
})

const sourceSpec = {
  beginDrag(props) {
    return {
      id: props.person.id
    }
  }
}

const sourceCollect = (connect, monitor) => ({
  dragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

export default connect(
  null,
  { addPersonToEvent }
)(
  DragSource('people', sourceSpec, sourceCollect)(
    DropTarget(['event'], spec, collect)(PersonCard)
  )
)
