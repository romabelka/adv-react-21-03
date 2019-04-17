import {observable, action} from 'mobx'
import authService from '../services/api'

class EventsStore {
    @observable events = []

    @action setEvents = events => this.events = events

    deleteEvent = async (id) => {
        await authService.deleteEvent(id)
        this.setEvents(this.events.filter(event => event.id !== id))
    }

    loadEvents = async () => {
        this.setEvents(await authService.fetchAllEvents())
    }
}

export default EventsStore
