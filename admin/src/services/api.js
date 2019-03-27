import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
    this.db = this.fb.firestore()
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)
  getEvents = () =>
    this.db
      .collection('events')
      .get()
      .then((querySnapshot) => {
        const events = []
        querySnapshot.docs.forEach((doc) => {
          events.push({ ...doc.data(), id: doc.id })
        })
        return Promise.resolve(events)
      })
      .catch((error) => {
        return Promise.reject(error)
      })

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
