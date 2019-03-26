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
      .then(function(querySnapshot) {
        const arr = []
        querySnapshot.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }))
        return arr
      })
  }
}

export default new ApiService()
