import {observable, action} from 'mobx'
import authService from '../services/api'

class PeopleStore {
    @observable people = []

    @action setPeople = people => this.people = people

    loadPeople = async () => {
        this.setPeople(await authService.loadAllPeople())
    }
}

export default PeopleStore
