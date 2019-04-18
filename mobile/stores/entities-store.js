import {observable, computed, action} from 'mobx'

class EntitiesStore {
    _unsubscribe = null
    @observable loading = false
    @observable loaded = false

    @observable entities = {}

    @action _setEntities = entities => this.entities = entities

    @computed get list() {
        return Object.values(this.entities)
    }

    unsubscribe = () => {
        if (!this._unsubscribe) return
        this._unsubscribe()
        this._unsubscribe = null
    }
}

export default EntitiesStore
