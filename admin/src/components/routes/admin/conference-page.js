import React, { Component } from 'react'
import { connect } from 'react-redux'
import ConferenceList from '../../conference/conference-list'
import { getList } from '../../../ducks/conference'

class ConferencePage extends Component {
  static propTypes = {}

  componentWillMount() {
    this.props.getConferences()
  }

  render() {
    return (
      <div>
        <h2>Conference List</h2>
        <ConferenceList />
      </div>
    )
  }
}

export default connect(
  null,
  (dispatch) => ({
    getConferences: () => dispatch(getList())
  })
)(ConferencePage)
