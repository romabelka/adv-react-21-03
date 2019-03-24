import 'firebase/auth'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'spreadsheet'
const prefix = `${appName}/${moduleName}`

export const USER_ADD_TO_LIST = `${prefix}/USER_ADDED_TO_LIST`

/**
 * Reducer
 * */

export default function reducer(state = [], action) {
  const { type, payload } = action

  switch (type) {
    case USER_ADD_TO_LIST:
      return [...state, payload.user]

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const getList = (state) => {
  debugger
  return state[moduleName]
}

/**
 * Action Creators
 * */

export function addUser(firstname, lastname, email) {
  return async (dispatch) => {
    dispatch({
      type: USER_ADD_TO_LIST,
      payload: { user: { firstname, lastname, email } }
    })
  }
}
