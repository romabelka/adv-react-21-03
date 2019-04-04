const firebase = require('firebase/app')
require('firebase/auth')
require('firebase/firestore')

const appName = 'adv-react-21-03'

const firebaseConfig = {
  apiKey: 'AIzaSyCj-E59IlLpTfHFqrNl4DREvpwD5bq8fmM',
  authDomain: 'adv-react-21-03.firebaseapp.com',
  databaseURL: 'https://adv-react-21-03.firebaseio.com',
  projectId: 'adv-react-21-03',
  storageBucket: '',
  messagingSenderId: '679222747585'
}

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
  }

  fetchAllEvents() {
    return this.fb
        .firestore()
        .collection('events')
        .get()
        .then(resToEntities)
  }
}

function resToEntities(res) {
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

module.exports = new ApiService()
