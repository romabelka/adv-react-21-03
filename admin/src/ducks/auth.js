import { appName } from '../config'
import {
  all,
  takeEvery,
  call,
  put,
  take,
  delay,
  fork
} from 'redux-saga/effects'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`
export const TIME_PASSED_AFTER_SIGN_IN_ERROR = `${prefix}/TIME_PASSED_AFTER_SIGN_IN_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  numberOfRecentErrors: 0
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user).set('numberOfRecentErrors', 0)
    case SIGN_IN_ERROR:
      return state.set('numberOfRecentErrors', state.numberOfRecentErrors + 1)
    case TIME_PASSED_AFTER_SIGN_IN_ERROR:
      return state.set(
        'numberOfRecentErrors',
        Math.max(state.numberOfRecentErrors - 1, 0)
      )
    default:
      return state
  }
}

/**
 * Selectors
 * */

export const userSelector = (state) => state[moduleName].user
export const isAuthorizedSelector = createSelector(
  userSelector,
  (user) => !!user
)
export const wasToManyRecentAuthErrors = (state) =>
  state[moduleName].numberOfRecentErrors >= 3

/**
 * Init logic
 */

export function init(store) {
  api.onAuthStateChanged((user) => {
    store.dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  })
}

/**
 * Action Creators
 * */
/*
export function signIn(email, password) {
  return (dispatch) =>
    api.signIn(email, password).then((user) =>
      dispatch({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    )
}
*/

/*
export function signUp(email, password) {
  return (dispatch) =>
    api.signUp(email, password).then((user) =>
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: { user }
      })
    )
}
*/
export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
})

export const signIn = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password }
})

export const passTimeAfterError = () => ({
  type: TIME_PASSED_AFTER_SIGN_IN_ERROR
})

export function* signUpSaga({ payload }) {
  yield put({ type: SIGN_UP_START })

  try {
    const user = yield call(api.signUp, payload.email, payload.password)

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* signInSaga() {
  yield fork(toManySignErrorsSaga)
  while (true) {
    const { payload } = yield take(SIGN_IN_REQUEST)

    yield put({ type: SIGN_IN_START })

    try {
      const user = yield call(api.signIn, payload.email, payload.password)

      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { user }
      })
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })
    }
  }
}

export function* toManySignErrorsSaga() {
  yield takeEvery(SIGN_IN_ERROR, resetErrorAfterTimeout)
}

function* resetErrorAfterTimeout() {
  yield delay(5000)
  yield put(passTimeAfterError())
}

export function* saga() {
  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
