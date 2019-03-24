import { appName } from '../config'

/**
 * Constants
 * */
export const moduleName = 'addPerson'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */

export default function reducer(state = [], action) {
  const { type, payload, meta } = action

  switch (type) {
    case ADD_PERSON:
      return [...state, payload.person]
    default:
      return state
  }
}

/**
 * Selectors
 * */
export const personList = (state) => state[moduleName]

/**
 * Action Creators
 * */

export function addPerson(name, surname, email) {
  return (dispatch) => {
    dispatch({
      type: ADD_PERSON,
      payload: { person: { name, surname, email } }
    })
  }
}
