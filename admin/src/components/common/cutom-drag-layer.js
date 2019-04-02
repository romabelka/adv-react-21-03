import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'

const style = {
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  pointerEvents: 'none'
}

class CustomDragLayer extends Component {
  getPreview() {
    const { item, isDragging, offset } = this.props
    if (!item || !isDragging || !offset) return null

    const { DragPreview, ...rest } = item

    if (!DragPreview) return null

    const transform = `translate(${offset.x}px, ${offset.y}px)`
    return (
      <div style={{ transform }}>
        <DragPreview {...rest} />
      </div>
    )
  }

  render() {
    if (!this.getPreview()) return null

    return <div style={style}>{this.getPreview()}</div>
  }
}

const collect = (monitor) => ({
  isDragging: monitor.isDragging(),
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  offset: monitor.getSourceClientOffset()
})

export default DragLayer(collect)(CustomDragLayer)
