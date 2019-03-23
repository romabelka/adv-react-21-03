import { Record } from 'immutable'
import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'persons'
const prefix = `${appName}/${moduleName}`

export const ADD_NEW = `${prefix}/ADD_NEW`

/**
 * Reducer
 */

export const ReducerRecord = Record({
  persons: []
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_NEW:
      return state.persons.push(payload.person)
    default:
      return state
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export const addNewPerson = (firstName, lastName, email) => (dispatch) => {
  dispatch({
    type: ADD_NEW,
    payload: {
      person: {
        firstName,
        lastName,
        email
      }
    }
  })
}
