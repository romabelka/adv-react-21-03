import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { DropTarget } from 'react-dnd'
import { removePersonFromList } from '../../../ducks/people'
import { removeEventFromList } from '../../../ducks/events'

class Trash extends PureComponent {
  render() {
    const { dropTarget, canDrop } = this.props
    return dropTarget(
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          background: '#fff',
          textAlign: 'center',
          color: canDrop ? 'green' : 'black'
        }}
      >
        ____.-.____ <br />
        [___________]
        <br />
        (d||||||||||||||||||||||||||||b)
        <br />
        `|||||TRASH|||||`
        <br />
        ||||||||||||||||||||||||||
        <br />
        ||||||||||||||||||||||||||
        <br />
        ||||||||||||||||||||||||||
        <br />
        ||||||||||||||||||||||||||
        <br />
        `""""""""""""`
        <br />
      </div>
    )
  }
}

const spec = {
  drop(props, monitor) {
    debugger
    const item = monitor.getItem()
    const type = monitor.getItemType()

    if (type === 'event') {
      props.removeEventFromList(item.id)
      return
    }

    props.removePersonFromList(item.id)
  }
}

const collect = (connect, monitor) => ({
  dropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop()
})

export default connect(
  null,
  {
    removeEventFromList,
    removePersonFromList
  }
)(DropTarget(['event', 'people'], spec, collect)(Trash))
