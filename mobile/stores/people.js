import EntitiesStore from './entities-store'
import api from '../services/api'

class PeopleStore extends EntitiesStore {
    subscribe = () => {
        this.unsubscribe()
        this._unsubscribe = api.subscribeForPeople(this._setEntities)
    }
}

export default PeopleStore
