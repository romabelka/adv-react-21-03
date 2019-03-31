import React from 'react'
import { DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { moveToTrash } from '../../ducks/trash'

const Types = {
  person: 'person',
  event: 'event'
}

const styles = {
  minHeight: '100px',
  border: '2px solid red'
}

const basketSquareTarget = {
  drop(props, monitor) {
    const item = monitor.getItem()

    props.moveToTrash(monitor.getItemType(), item.id)

    return { moved: true }
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  }
}

class BasketSquare extends React.Component {
  render() {
    const { connectDropTarget } = this.props
    return connectDropTarget(<div style={styles} />)
  }
}

// TODO: multiple types
export default connect(
  null,
  { moveToTrash }
)(DropTarget(Types.event, basketSquareTarget, collect)(BasketSquare))
