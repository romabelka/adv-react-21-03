import { appName } from '../config'
import { all, takeEvery, call, put, take, spawn } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
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
export const SIGN_IN_LIMIT_REACHED = `${prefix}/SIGN_IN_LIMIT_REACHED`
export const AUTH_STATE_CHANGE = `${prefix}/AUTH_STATE_CHANGE`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  limitReached: false,
  error: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case AUTH_STATE_CHANGE:
      return state.set('user', payload.user)

    case SIGN_IN_LIMIT_REACHED:
      return state.set('limitReached', true)

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

/**
 * Init logic
 */

/**
 * Action Creators
 * */
export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
})

export const signIn = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password }
})

const createAuthChannel = () =>
  eventChannel((emit) => api.onAuthStateChanged(emit))

export function* realtimeSyncSaga() {
  const channel = yield call(createAuthChannel)

  while (true) {
    const data = yield take(channel)

    yield put({
      type: AUTH_STATE_CHANGE,
      payload: { data }
    })
  }
}

export function* signUpSaga({ payload }) {
  yield put({ type: SIGN_UP_START })

  try {
    yield call(api.signUp, payload.email, payload.password)

    yield put({
      type: SIGN_UP_SUCCESS
    })
  } catch (error) {
    yield put({
      type: SIGN_UP_ERROR,
      error
    })
  }
}

export function* signInSaga() {
  let attempts = 0
  while (true) {
    const { payload } = yield take(SIGN_IN_REQUEST)

    yield put({ type: SIGN_IN_START })

    try {
      yield call(api.signIn, payload.email, payload.password)

      yield put({
        type: SIGN_IN_SUCCESS
      })
    } catch (error) {
      yield put({
        type: SIGN_IN_ERROR,
        error
      })

      if (++attempts >= 3)
        return yield put({
          type: SIGN_IN_LIMIT_REACHED
        })
    }
  }
}

export function* saga() {
  yield spawn(realtimeSyncSaga)

  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
