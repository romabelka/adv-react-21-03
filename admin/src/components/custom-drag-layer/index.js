import React from 'react'
import { DragLayer } from 'react-dnd'
import EventDragPreview from '../events/event-drag-preview'
import getItemStyles from './getItemStyles'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

const CustomDragLayer = (props) => {
  const { item, itemType, isDragging } = props

  function renderItem() {
    switch (itemType) {
      case 'event':
        return <EventDragPreview event={item} />
      default:
        return null
    }
  }

  if (!isDragging) {
    return null
  }

  return (
    <div style={layerStyles}>
      <div style={getItemStyles(props)}>{renderItem()}</div>
    </div>
  )
}

export default DragLayer((monitor) => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  isDragging: monitor.isDragging(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset()
}))(CustomDragLayer)
