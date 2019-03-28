import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { addPersonToEvent } from '../../ducks/people'

class PersonCard extends Component {
  static propTypes = {}

  render() {
    const { person, dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'
    return (
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

export default connect(
  null,
  { addPersonToEvent }
)(DropTarget(['event'], spec, collect)(PersonCard))
