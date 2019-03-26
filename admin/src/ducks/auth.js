import { appName } from '../config'
import { all, takeEvery, call, put, take, delay } from 'redux-saga/effects'
import { Record } from 'immutable'
import { createSelector } from 'reselect'
import api from '../services/api'

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

const NUM_OF_FAILURE_SIGN_IN_BLOCKING = 3
const DELAY_AFTER_BLOCKING_SIGN_IN = 3000

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_IN_BLOCKED = `${prefix}/SIGN_IN_BLOCKED`
export const SIGN_IN_UNBLOCKED = `${prefix}/SIGN_IN_UNBLOCKED`
export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set('user', payload.user)

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

export function* maxCountsOfCall(saga, maxCalls) {
  let returnedValue
  for (let i = 0; i < maxCalls; i++) {
    returnedValue = yield call(saga)
  }

  return returnedValue
}

export function* singInRequest() {
  const { payload } = yield take(SIGN_IN_REQUEST)

  yield put({ type: SIGN_IN_START })

  try {
    const user = yield call(api.signIn, payload.email, payload.password)

    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })

    return user
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error
    })
  }
}

export function* signInSaga() {
  // for(let i = 0; i < 3; i++) {
  //   const { payload } = yield take(SIGN_IN_REQUEST)

  //   yield put({ type: SIGN_IN_START })

  //   try {
  //     const user = yield call(api.signIn, payload.email, payload.password)

  //     yield put({
  //       type: SIGN_IN_SUCCESS,
  //       payload: { user }
  //     })
  //   } catch (error) {
  //     yield put({
  //       type: SIGN_IN_ERROR,
  //       error
  //     })
  //   }
  // }
  while (true) {
    const user = yield call(
      maxCountsOfCall,
      singInRequest,
      NUM_OF_FAILURE_SIGN_IN_BLOCKING
    )

    if (!user) {
      yield put({
        type: SIGN_IN_BLOCKED
      })

      yield delay(DELAY_AFTER_BLOCKING_SIGN_IN)

      yield put({ type: 'SIGN_IN_UNBLOCKED' })
    }
  }
}

export function* saga() {
  yield all([takeEvery(SIGN_UP_REQUEST, signUpSaga), signInSaga()])
}
