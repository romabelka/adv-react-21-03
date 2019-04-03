import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

const COLLECTION_PEOPLE = 'people'
const COLLECTION_EVENTS = 'events'

class ApiService {
  constructor() {
    this.fb = firebase
    this.fb.initializeApp(firebaseConfig)
  }

  signIn = (email, password) =>
    this.fb.auth().signInWithEmailAndPassword(email, password)
  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password)

  getCollectionByName = (collectionName) =>
    this.fb.firestore().collection(collectionName)

  getData = (collectionName) => this.getCollectionByName(collectionName).get()

  getItem = (collectionName, id) =>
    this.getCollectionByName(collectionName).doc(id)

  subscribeForCollection = (collectionName, callback) =>
    this.getCollectionByName(collectionName).onSnapshot((snapshot) =>
      callback(resToEntities(snapshot))
    )

  fetchAllEvents = () => this.getData(COLLECTION_EVENTS).then(resToEntities)

  onAuthStateChanged = (callback) => this.fb.auth().onAuthStateChanged(callback)

  subscribeForPeople = (callback) =>
    this.subscribeForCollection(COLLECTION_PEOPLE, callback)

  subscribeForEvents = (callback) =>
    this.subscribeForCollection(COLLECTION_EVENTS, callback)

  loadAllPeople = () =>
    this.getData(COLLECTION_PEOPLE).then((res) =>
      res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    )

  addPerson = (person) =>
    this.getCollectionByName(COLLECTION_PEOPLE).add(person)

  addPersonToEvent = (eventId, peopleIds) =>
    this.getItem(COLLECTION_EVENTS, eventId).update({ peopleIds })

  deleteEvent = (id) => this.getItem(COLLECTION_EVENTS, id).delete()

  deletePerson = (id) => this.getItem(COLLECTION_PEOPLE, id).delete()
}

function resToEntities(res) {
  return res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

export default new ApiService()
