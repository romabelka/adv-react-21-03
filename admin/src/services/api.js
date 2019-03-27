import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  getEvents = () => {
    return this.fb
      .firestore()
      .collection('events')
      .get()
      .then((querySnapshot) => {
        const data = []
        querySnapshot.forEach(function(doc) {
          data.push(doc.data())
        })
        return data
      })
  }
}

export default new ApiService()
