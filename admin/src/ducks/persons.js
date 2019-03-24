import { Record } from 'immutable'
import { appName } from '../config'
import { reset as resetReduxForm } from 'redux-form'

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
      return {
        ...state,
        persons: state.persons.concat(payload.person)
      }
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

export const addNewPerson = (person) => (dispatch) => {
  dispatch({
    type: ADD_NEW,
    payload: {
      person
    }
  })
  dispatch(resetReduxForm('add-new-person'))
}
