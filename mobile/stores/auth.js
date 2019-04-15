import {observable, action, autorun, computed} from 'mobx'
import authService from '../services/api'

class AuthStore {
    @observable email = ''
    @observable password = ''
    @observable user = null

    @computed get isValidPassword() {
        return this.password.length > 8
    }

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

export default AuthStore
