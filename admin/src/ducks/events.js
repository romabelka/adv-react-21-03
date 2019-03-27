import { appName } from '../config'
import { Record } from 'immutable'
import { call, put, takeEvery } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const EVENTS_REQUEST = `${prefix}/EVENTS_REQUEST`
export const EVENTS_START = `${prefix}/EVENTS_START`
export const EVENTS_SUCCESS = `${prefix}/EVENTS_SUCCESS`
export const EVENTS_ERROR = `${prefix}/EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  allEvents: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case EVENTS_SUCCESS:
      return state.set('allEvents', payload)
    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventSelector = createSelector(
  stateSelector,
  (state) => state.allEvents
)

/**
 * Action Creators
 * */
export const getEvents = () => ({
  type: EVENTS_REQUEST
})

/**
 * Sagas
 */

export function* getEventsSaga() {
  yield put({ type: EVENTS_START })
  try {
    const events = yield call(api.getEvents)
    yield put({
      type: EVENTS_SUCCESS,
      payload: events
    })
  } catch (error) {
    yield put({
      type: EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(EVENTS_REQUEST, getEventsSaga)
}
