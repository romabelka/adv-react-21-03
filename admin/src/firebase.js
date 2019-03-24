import firebase from 'firebase/app'
import { firebaseConfig } from './config'

firebase.initializeApp(firebaseConfig)

export const authRef = firebase.auth()
