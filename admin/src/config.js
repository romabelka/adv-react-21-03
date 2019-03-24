import firebase from 'firebase/app'
export const appName = 'adv-react-21-03'

export const config = {
  apiKey: 'AIzaSyDs3i4lR71PaFjpEtirVPFSdIqIm4W7dC0',
  authDomain: 'reactadv-8b38f.firebaseapp.com',
  databaseURL: 'https://reactadv-8b38f.firebaseio.com',
  projectId: 'reactadv-8b38f',
  storageBucket: 'reactadv-8b38f.appspot.com',
  messagingSenderId: '326265815758'
}

firebase.initializeApp(config)
