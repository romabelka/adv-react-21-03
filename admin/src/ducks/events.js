import { appName } from '../config'
import { Record, List } from 'immutable'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const EVENTS_PAGE_LOADED = `${prefix}/EVENTS_PAGE_LOADED`
export const LOAD_EVENTS = `${prefix}/LOAD_EVENTS`

/**
 * Reducer
 * */
const ReducerState = Record({
  events: new List([])
})

const EventRecord = Record({
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null,
  id: null
})

export default function reducer(state = new ReducerState(), action) {
  const { type, payload } = action

  switch (type) {
    case LOAD_EVENTS:
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

export const eventPageLoaded = () => ({
  type: EVENTS_PAGE_LOADED
})
export const loadEvents = (events) => ({
  type: LOAD_EVENTS,
  payload: events
})

/**
 * Sagas
 */

export function* loadEventsSaga() {
  const events = yield call(api.getEvents)
  yield put(loadEvents(events))
}

export function* saga() {
  yield takeEvery(EVENTS_PAGE_LOADED, loadEventsSaga)
}
