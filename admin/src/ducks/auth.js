import { Record } from 'immutable'
import firebase from 'firebase'
import 'firebase/auth'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const USER_STATE_CHANGE = `${prefix}/USER_STATE_CHANGE`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
    case USER_STATE_CHANGE:
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

export function signIn(email, password) {
  return (dispatch) => {
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user: {} }
    })
  }
}

export function userStateChange(user) {
  return (dispatch) => {
    dispatch({
      type: USER_STATE_CHANGE,
      payload: { user }
    })
  }
}

export function signUp(email, password) {
  return async (dispatch) => {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  }
}
