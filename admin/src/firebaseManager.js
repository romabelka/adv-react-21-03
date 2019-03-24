import firebase from 'firebase'
import 'firebase/auth'
import { firebaseConfig } from './config'
import { userStateChange } from './ducks/auth'

export const initFirebase = (store) => {
  const dispatch = store.dispatch

  firebase.initializeApp(firebaseConfig)

  firebase.auth().onAuthStateChanged((user) => {
    dispatch(userStateChange(user))
    console.log('---', 'auth state changed', user)
  })
}
