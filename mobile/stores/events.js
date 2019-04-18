import EntitiesStore from './entities-store'
import api from '../services/api'

class EventsStore extends EntitiesStore {
    subscribe = () => {
        this.unsubscribe()
        this._unsubscribe = api.subscribeForEvents(this._setEntities)
    }

    delete = id => {
        api.deleteEvent(id)
    }
}


export default EventsStore
