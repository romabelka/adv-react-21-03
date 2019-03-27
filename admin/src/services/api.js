import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { firebaseConfig } from '../config'

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
    this.fs = this.fb.firestore()
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  getEvents = async () =>
    await this.fs
      .collection('events')
      .get()
      .then((querySnapshot) => {
        let arr = []
        querySnapshot.forEach((doc) => arr.push(doc.data()))
        return arr
      })

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)
}

export default new ApiService()
