import { appName } from '../config'
import { Record, List } from 'immutable'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import api from '../services/api'
import { generateId } from './utils'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const REQUEST_EVENTS = `${prefix}/REQUEST_EVENTS`
export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`
export const GET_EVENTS_ERROR = `${prefix}/GET_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  events: new List([])
})

const EventRecord = Record({
  title: null,
  url: null,
  where: null,
  when: null,
  month: null,
  submissionDeadline: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_SUCCESS:
      return state.set(
        'events',
        new List(payload.map((event) => new EventRecord(event)))
      )

    default:
      return state
  }
}
/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const eventsSelector = createSelector(
  stateSelector,
  (state) => state.events.valueSeq().toArray()
)

/**
 * Action Creators
 * */

export const getEvents = (person) => ({
  type: GET_EVENTS_REQUEST,
  payload: { person }
})

/**
 * Sagas
 */

export function* getEventsSaga() {
  try {
    const events = yield call(api.getEvents)
    yield put({
      type: GET_EVENTS_SUCCESS,
      payload: events
    })
  } catch (error) {
    yield put({
      type: GET_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS_REQUEST, getEventsSaga)
}
