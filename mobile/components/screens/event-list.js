import React, { Component } from 'react'
import EventList from '../events/event-list'
import * as PropTypes from 'prop-types'
import { inject, observer } from 'mobx-react'

@inject('events')
@observer
class EventListScreen extends Component {
    componentDidMount() {
        this.props.events.loadEvents()
    }

    render() {
        let { navigation } = this.props
        const handleEventPress = ({ id, title }) => console.log('event', { id, title })
        return <EventList events={this.props.events.events} onEventPress={handleEventPress}/>
    }
}

EventListScreen.propTypes = { navigation: PropTypes.any }

EventListScreen.navigationOptions = {
    title: 'events list'
}

export default EventListScreen
