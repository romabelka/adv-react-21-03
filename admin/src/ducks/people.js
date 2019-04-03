import { appName } from '../config'
import { Record, OrderedMap } from 'immutable'
import {
  takeEvery,
  put,
  call,
  all,
  delay,
  fork,
  spawn,
  cancel,
  cancelled,
  race,
  take
} from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import { reset } from 'redux-form'
import { createSelector } from 'reselect'
import api from '../services/api'
import { fbToEntities } from '../services/utils'

const defaultPeople = new OrderedMap()

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_START = `${prefix}/ADD_PERSON_START`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

export const FETCH_ALL_REQUEST = `${prefix}/FETCH_ALL_REQUEST`
export const FETCH_ALL_SUCCESS = `${prefix}/FETCH_ALL_SUCCESS`

export const DELETE_PERSON_REQUEST = `${prefix}/DELETE_PERSON_REQUEST`
export const DELETE_PERSON_SUCCESS = `${prefix}/DELETE_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
  entities: defaultPeople
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
    case ADD_PERSON_SUCCESS:
      return state.setIn(['entities', payload.id], new PersonRecord(payload))

    case FETCH_ALL_SUCCESS:
      return state.set('entities', fbToEntities(payload, PersonRecord))

    case DELETE_PERSON_SUCCESS:
      return state.deleteIn(['entities', payload.id])

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

const idSelector = (_, { id }) => id

export const personSelector = createSelector(
  stateSelector,
  idSelector,
  (state, id) => state.getIn(['entities', id])
)

/**
 * Action Creators
 * */

export const addPerson = (person) => ({
  type: ADD_PERSON_REQUEST,
  payload: { person }
})

export const deletePerson = (id) => ({
  type: DELETE_PERSON_REQUEST,
  payload: { id }
})

export const fetchAllPeople = () => ({
  type: FETCH_ALL_REQUEST
})

/**
 * Sagas
 */

export function* addPersonSaga(action) {
  yield put({
    type: ADD_PERSON_START,
    payload: { ...action.payload.person }
  })

  const { id } = yield call(api.addPerson, action.payload.person)

  yield put({
    type: ADD_PERSON_SUCCESS,
    payload: { id, ...action.payload.person }
  })

  yield put(reset('person'))
}

// export function* fetchAllSaga() {
//   const data = yield call(api.loadAllPeople)
//
//   yield put({
//     type: FETCH_ALL_SUCCESS,
//     payload: data
//   })
// }

export function* deletePersonSaga({ payload }) {
  try {
    yield call(api.deletePerson, payload.id)

    yield put({
      type: DELETE_PERSON_SUCCESS,
      payload
    })
  } catch (_) {}
}

// export function* callWithRetry(saga) {
//   for (let i = 0; i < 5; i++) {
//     try {
//       console.log('---', 1, saga)
//       return yield call(saga)
//     } catch (e) {
//       yield delay(500 * Math.pow(2, i))
//     }
//   }
//
//   throw new Error('retry limit reached')
//}

// export function* syncWithPolling() {
//   try {
//     let count = 0
//     while (true) {
//       yield call(fetchAllSaga)
//
//       yield delay(3000)
//
//       if (count++ >= 2) throw new Error('some network error')
//     }
//   } finally {
//     if (yield cancelled()) console.log('---', 'cancelled')
//   }
// }

// export function* cancellableSyncSaga() {
//   yield race({
//     sync: syncWithPolling(),
//     timeout: delay(7000)
//     //    routeChange: locationChangeSaga(),
//     //    stopBtnClicked: watchStopSyncSaga()
//   })
//   /*
//   const process = yield fork(syncWithPolling)
//   yield delay(5000)
//   yield cancel(process)
// */
// }

const createPeopleChannel = () =>
  eventChannel((emit) => api.subscribeForPeople(emit))

export function* realtimeSyncSaga() {
  const channel = yield call(createPeopleChannel)

  while (true) {
    const data = yield take(channel)

    yield put({
      type: FETCH_ALL_SUCCESS,
      payload: data
    })
  }
}

export function* saga() {
  yield spawn(realtimeSyncSaga)

  yield all([
    takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    takeEvery(DELETE_PERSON_REQUEST, deletePersonSaga)
  ])
}
