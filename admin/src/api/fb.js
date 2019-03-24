import firebase from './firebase'
import { signIn } from '../ducks/auth'

export default class FB {
  static async createUserAsync(email, password) {
    return await firebase.auth().createUserWithEmailAndPassword(email, password)
  }

  static subscribeOnAuthStateChanged() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('---', 'auth state changed', user)
      const { email } = user
      signIn(email, null)
    })
  }
}
