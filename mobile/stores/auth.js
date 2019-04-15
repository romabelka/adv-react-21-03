import {observable, action, autorun} from 'mobx'

class AuthStore {
    @observable email = ''
    @observable password = ''

    constructor() {
        autorun(() => {
            console.log('---', 'email:', this.email, 'password: ', this.password)
        })
    }

    @action setEmail = (email) => this.email = email
    @action setPassword = (password) => {
        this.password = password
        this.password = ''
        this.password = password
    }

    signIn = () => {
        console.log('---', 'sign in', this.email, this.password)
    }
}

export default new AuthStore()
