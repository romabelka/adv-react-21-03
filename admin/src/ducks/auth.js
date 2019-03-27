import { appName } from '../config'
import { all, takeEvery, call, put, take } from 'redux-saga/effects'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_FORBIDDEN = `${prefix}/SIGN_IN_FORBIDDEN`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`
export const SIGN_IN_MAX_FAILED_ATTEMPTS = 3

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null,
  isSignInForbidden: false
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user).set('isSignInForbidden', false)
    case SIGN_IN_FORBIDDEN:
      return state.set('isSignInForbidden', true)
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

export const isSignInForbidden = (state) => state[moduleName].isSignInForbidden

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

export const signUp = (email, password) => ({
  type: SIGN_UP_REQUEST,
  payload: { email, password }
})

export const signIn = (email, password) => ({
  type: SIGN_IN_REQUEST,
  payload: { email, password }
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
  let failedAttemptsCount = 0
  while (true) {
    if (failedAttemptsCount >= SIGN_IN_MAX_FAILED_ATTEMPTS) {
      yield put({ type: SIGN_IN_FORBIDDEN })
    } else {
      const { payload } = yield take(SIGN_IN_REQUEST)
      yield put({ type: SIGN_IN_START })

      try {
        const user = yield call(api.signIn, payload.email, payload.password)

        yield put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })

        failedAttemptsCount = 0
      } catch (error) {
        yield put({
          type: SIGN_IN_ERROR,
          error
        })

        failedAttemptsCount++
      }
    }
  }
}

export function* saga() {
  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
