import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PersonCard extends Component {
  static propTypes = {}

  render() {
    const { person } = this.props
    return (
      <div>
        {person.email}: {person.firstName}
      </div>
    )
  }
}

export default PersonCard
