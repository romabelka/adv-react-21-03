import { Record } from 'immutable'
import { appName } from '../config'
import FB from '../api/fb'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`

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
  console.log('--SIGN IN', email, password)
  return (dispatch) => {
    console.log('--SIGN IN dispatch', email, password)
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user: { email, password } }
    })
  }
}

export function signUp(email, password) {
  return async (dispatch) => {
    const user = await FB.createUserAsync(email, password)

    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  }
}

//FB
FB.subscribeOnAuthStateChanged()
