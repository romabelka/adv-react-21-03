import {
  all,
  takeEvery,
  take,
  put,
  call,
  select,
  spawn
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import { createSelector } from 'reselect'
import { fbToEntities } from '../services/utils'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const SELECT_EVENT = `${prefix}/SELECT_EVENT`

export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT_REQUEST`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  loading: true,
  loaded: false,
  entities: new OrderedMap([])
})

export const EventRecord = Record({
  id: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null,
  peopleIds: []
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case FETCH_ALL_SUCCESS:
      return state
        .set('loading', false)
        .set('loaded', true)
        .set('entities', fbToEntities(payload, EventRecord))

    case ADD_PERSON_SUCCESS:
      return state.setIn(
        ['entities', payload.eventId, 'peopleIds'],
        payload.peopleIds
      )

    case DELETE_EVENT_REQUEST:
      return state.set('loading', true)

    default:
      return state
  }
}

/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const entitiesSelector = createSelector(
  stateSelector,
  (state) => state.entities
)
export const loadingSelector = createSelector(
  stateSelector,
  (state) => state.loading
)
export const loadedSelector = createSelector(
  stateSelector,
  (state) => state.loaded
)
export const eventListSelector = createSelector(
  entitiesSelector,
  (entities) => entities.valueSeq().toArray()
)

export const idSelector = (state, props) => props.id

export const eventSelector = createSelector(
  entitiesSelector,
  idSelector,
  (entities, id) => entities.get(id)
)

/**
 * Action Creators
 * */

export const selectEvent = (id) => ({
  type: SELECT_EVENT,
  payload: { id }
})

export const deleteEvent = (id) => ({
  type: DELETE_EVENT_REQUEST,
  payload: { id }
})

export const addPersonToEvent = (personId, eventId) => ({
  type: ADD_PERSON_REQUEST,
  payload: {
    personId,
    eventId
  }
})

/**
 * Sagas
 * */

const createEvetsChannel = () =>
  eventChannel((emit) => api.subscribeToEvents(emit))

export function* realtimeEventsSaga() {
  const channel = yield call(createEvetsChannel)
  while (true) {
    const data = yield take(channel)
    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data
    })
  }
}

export const deleteEventSaga = function*(action) {
  const { payload } = action

  try {
    yield call(api.deleteEvent, payload.id)
  } catch (_) {}
}

export function* addPersonToEventSaga({ payload: { eventId, personId } }) {
  const state = yield select(entitiesSelector)
  const curPeopleIds = state.getIn([eventId, 'peopleIds'])

  if (curPeopleIds.includes(personId)) return
  const peopleIds = curPeopleIds.concat(personId)

  yield call(api.addPersonToEvent, eventId, peopleIds)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { peopleIds, eventId }
  })
}

export function* saga() {
  yield spawn(realtimeEventsSaga)
  yield all([
    takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga),
    takeEvery(ADD_PERSON_REQUEST, addPersonToEventSaga)
  ])
}
