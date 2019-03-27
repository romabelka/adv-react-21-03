import { appName } from '../config'
import { Record, List } from 'immutable'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'conference'
const prefix = `${appName}/${moduleName}`
export const GET_CONFERENCE_LIST = `${prefix}/GET_CONFERENCE_LIST`
export const UPDATE_CONFERENCE_LIST = `${prefix}/UPDATE_CONFERENCE_LIST`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([])
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case UPDATE_CONFERENCE_LIST:
      return state.set('entities', payload)

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const conferenceSelector = createSelector(
  stateSelector,
  (state) => state.entities
)

/**
 * Action Creators
 * */

export const getList = () => ({
  type: GET_CONFERENCE_LIST
})

/**
 * Sagas
 */

export function* getConferencesSaga() {
  const conferences = yield call(api.getConferences)

  yield put({
    type: UPDATE_CONFERENCE_LIST,
    payload: conferences
  })
}

export function* saga() {
  yield takeEvery(GET_CONFERENCE_LIST, getConferencesSaga)
}
