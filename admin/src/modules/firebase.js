import firebase from 'firebase'
import 'firebase/auth'
import { config } from '../config'

firebase.initializeApp(config)

export default firebase
