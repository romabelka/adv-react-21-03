import conferences from './conferences'
import firebase from 'firebase/app'
import 'firebase/firestore'

export function saveEventsToFB() {
  const eventsRef = firebase.firestore().collection('events')
  conferences.forEach((conference) => eventsRef.add(conference))
}

window.saveEventsToFB = saveEventsToFB
