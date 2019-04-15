import {observable, action, autorun} from 'mobx'
import authService from '../services/api'

class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    constructor() {
        setTimeout(() => {
            autorun(() => {
                console.log('---', 'email: ', this.email)
            })
        })
    }

    @action setEmail = (email) => this.email = email
    @action setPassword = (password) => {
        this.password = password
        this.password = ''
        this.password = password
    }

    @action setUser = user => this.user = user

    signIn = async () => {
        this.setUser(await authService.signIn(this.email, this.password))
    }
}

export default new AuthStore()
