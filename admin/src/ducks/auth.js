import { Record } from 'immutable'
import firebase from 'firebase'
import 'firebase/auth'
import { authRef } from '../firebase'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const FETCH_USER = `${prefix}/FETCH_USER`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_USER:
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const isAuthorized = (state) => !!state[moduleName].user

/**
 * Action Creators
 * */

export const signIn = (email, password) => async (dispatch) => {
  const user = await authRef.signInWithEmailAndPassword(email, password)

  dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  })
}

export const signUp = (email, password) => async (dispatch) => {
  const user = await authRef.createUserWithEmailAndPassword(email, password)

  dispatch({
    type: SIGN_UP_SUCCESS,
    payload: { user }
  })
}

export const fetchUser = () => (dispatch) => {
  authRef.onAuthStateChanged((user) => {
    dispatch({
      type: FETCH_USER,
      payload: { user }
    })
  })
}
