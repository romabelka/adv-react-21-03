import { Record, Map } from 'immutable'
import { appName } from '../config'
import { reset } from 'redux-form'

/**
 * Constants
 * */
export const moduleName = 'person'
const prefix = `${appName}/${moduleName}`

export const CREATE_PERSON_SUCCESS = `${prefix}/CREATE_PERSON_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  persons: new Map({})
})

const PersonRecord = Record({
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case CREATE_PERSON_SUCCESS:
      const { person } = payload

      return state.setIn(
        ['persons', person.email],
        new PersonRecord({ ...person })
      )
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const getPersons = (state) =>
  state[moduleName].persons
    .valueSeq()
    .toArray()
    .map((rec) => rec.toJS())

/**
 * Action Creators
 * */

export function createPerson(firstName, lastName, email) {
  return (dispatch) => {
    dispatch({
      type: CREATE_PERSON_SUCCESS,
      payload: { person: { firstName, lastName, email } }
    })

    dispatch(reset('person-form'))
  }
}
