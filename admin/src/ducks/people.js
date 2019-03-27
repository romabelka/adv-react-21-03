import { appName } from '../config'
import { Record, List } from 'immutable'
import { takeEvery, put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import { generateId } from './utils'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON = `${prefix}/ADD_PERSON`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
})

const PersonRecord = Record({
  id: null,
  firstName: null,
  lastName: null,
  email: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case ADD_PERSON:
      return state.update('entities', (entities) =>
        entities.push(new PersonRecord(payload))
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const peopleSelector = createSelector(
  stateSelector,
  (state) => state.entities.valueSeq().toArray()
)

/**
 * Action Creators
 * */

export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

/**
 * Sagas
 */

export function* addPersonSaga({ payload }) {
  const id = yield call(generateId)

  yield put({
    type: ADD_PERSON,
    payload: {
      id,
      ...payload.person
    }
  })

  yield put(reset('person'))
}

export function* saga() {
  yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}
