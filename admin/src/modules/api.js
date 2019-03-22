import firebase from './firebase'

export const createUser = async (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const onAuthStateChanged = (nextOrObserver) => {
  return firebase.auth().onAuthStateChanged(nextOrObserver)
}
