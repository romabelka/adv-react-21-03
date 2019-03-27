import { appName } from '../config'
import { takeEvery, put, call } from 'redux-saga/effects'
import { createSelector } from 'reselect'
import ApiService from '../services/api'

// constants
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`
export const GET_EVENTS_LIST_REQUEST = `${prefix}/GET_EVENTS_LIST_REQUEST`
export const GET_EVENTS_LIST_REQUEST_START = `${prefix}/GET_EVENTS_LIST_REQUEST_START`
export const GET_EVENTS_LIST_REQUEST_DONE = `${prefix}/GET_EVENTS_LIST_REQUEST_DONE`
export const GET_EVENTS_LIST_REQUEST_ERROR = `${prefix}/GET_EVENTS_LIST_REQUEST_ERROR`

//reducer

export default function reducer(
  state = {
    list: [],
    state: null,
    error: null
  },
  action
) {
  const { type, payload } = action

  switch (type) {
    case GET_EVENTS_LIST_REQUEST_START:
      return Object.assign({}, state, { state: 'loading' })
    case GET_EVENTS_LIST_REQUEST_DONE:
      return Object.assign({}, state, { list: payload }, { state: 'loaded' })
    case GET_EVENTS_LIST_REQUEST_ERROR:
      return Object.assign({}, state, { error: payload })
    default:
      return state
  }
}
// selectors
export const eventsListSelector = (state) => state[moduleName].list
export const eventsStateSelector = (state) => state[moduleName].state
export const eventsErrorSelector = (state) => state[moduleName].error
export const eventsSelector = createSelector(
  eventsListSelector,
  eventsStateSelector,
  eventsErrorSelector,
  (list, state, error) => ({ list, state, error })
)

// action creators
export const getEvents = () => ({
  type: GET_EVENTS_LIST_REQUEST
})
export const setEventsListStart = () => ({
  type: GET_EVENTS_LIST_REQUEST_START
})
export const setEventsListDone = (list) => ({
  type: GET_EVENTS_LIST_REQUEST_DONE,
  payload: list
})
export const setEventsListError = (error) => ({
  type: GET_EVENTS_LIST_REQUEST_ERROR,
  payload: error
})

//saga
export function* getEventsSaga() {
  yield put({ type: GET_EVENTS_LIST_REQUEST_START })
  try {
    const list = yield call(ApiService.getEvents)
    yield put({ type: GET_EVENTS_LIST_REQUEST_DONE, payload: list })
  } catch (e) {
    yield put({ type: GET_EVENTS_LIST_REQUEST_ERROR, error: e })
  }
}

export function* saga() {
  yield takeEvery(GET_EVENTS_LIST_REQUEST, getEventsSaga)
}
