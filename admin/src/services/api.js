import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
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
  getEvents = () =>
    this.fb
      .firestore()
      .collection('events')
      .get()
      .then(function(querySnapshot) {
        const arr = []
        querySnapshot.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }))
        return arr
      })

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
