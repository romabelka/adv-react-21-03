import React, { Component } from 'react'
import { DropTarget } from 'react-dnd'

class Trash extends Component {
  constructor(props) {
    super(props)

    this.state = {
      removedEvents: 0,
      removedPersons: 0
    }
  }

  onDrop = (type, data) => {
    let { removedEvents, removedPersons } = this.state

    switch (type) {
      case 'event':
        removedEvents++
        break
      case 'person':
        removedPersons++
        break
      default:
        break
    }

    this.setState({
      removedEvents,
      removedPersons
    })
  }

  render() {
    const { dropTarget, canDrop, isOver } = this.props
    const borderColor = canDrop ? (isOver ? 'red' : 'green') : 'black'

    return dropTarget(
      <div
        style={{
          width: '300px',
          height: '100px',
          border: `1px solid ${borderColor}`
        }}
      >
        Trash
        <div onClick={() => this.setState({ removedEvents: 55 })}>
          Removed events: {this.state.removedEvents}
        </div>
        <div>Removed person: {this.state.removedPersons}</div>
        {canDrop && <div>Drop here</div>}
      </div>
    )
  }
}

const spec = {
  drop(props, monitor, component) {
    const itemType = monitor.getItemType()
    component.onDrop(itemType, monitor.getItem())
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
})

export default DropTarget(['event', 'person'], spec, collect)(Trash)
