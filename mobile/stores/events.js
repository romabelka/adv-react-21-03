import {observable, action} from 'mobx'
import authService from '../services/api'

class EventsStore {
    @observable events = []

    @action setEvents = events => this.events = events

    loadEvents = async () => {
        this.setEvents(await authService.fetchAllEvents())
    }
}

export default EventsStore
