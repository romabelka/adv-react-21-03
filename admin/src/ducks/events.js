import { appName } from '../config'
import { createSelector } from 'reselect'
import { List, Record } from 'immutable'
import api from '../services/api'
import { generateId } from './utils'
import { takeEvery, call, put, all, select } from 'redux-saga/effects'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const LOAD_EVENTS_REQUEST = `${prefix}/LOAD_EVENTS_REQUEST`
export const LOAD_EVENTS = `${prefix}/LOAD_EVENTS`
export const LOAD_EVENTS_SUCCESS = `${prefix}/LOAD_EVENTS_SUCCESS`
export const LOAD_EVENTS_ERROR = `${prefix}/LOAD_EVENTS_ERROR`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: new List([]),
  eventsLoaded: false
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
    case LOAD_EVENTS_SUCCESS:
      const events = new List(payload.events.map((ev) => new EventRecord(ev)))
      return state
        .update('entities', (entities) => events)
        .set('eventsLoaded', true)

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
  (state) => state.entities.valueSeq().toArray()
)

export const selectEventsLoaded = createSelector(
  stateSelector,
  (state) => state.eventsLoaded
)

/**
 * Action Creators
 * */

export const loadEvents = () => ({
  type: LOAD_EVENTS_REQUEST
})

/**
 * Sagas
 */

export function* norimizeEventSage(event) {
  const id = yield call(generateId)
  return { id, ...event }
}

export function* loadEventsSaga() {
  try {
    const state = yield select()
    if (selectEventsLoaded(state)) {
      return
    }

    const events = yield call(api.getEvents)

    const updatedEvents = yield all(
      events.map((event) => {
        return call(norimizeEventSage, event)
      })
    )

    yield put({
      type: LOAD_EVENTS_SUCCESS,
      payload: { events: updatedEvents }
    })
  } catch (error) {
    yield put({
      type: LOAD_EVENTS_ERROR,
      error
    })
  }
}

export function* saga() {
  yield takeEvery(LOAD_EVENTS_REQUEST, loadEventsSaga)
}
