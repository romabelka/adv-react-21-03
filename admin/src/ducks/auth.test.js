import reducer, {
  ReducerRecord,
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  signInSaga,
  signUpSaga,
  TIME_PASSED_AFTER_SIGN_IN_ERROR,
  toManySignErrorsSaga
} from './auth'
import {
  all,
  takeEvery,
  call,
  put,
  take,
  delay,
  fork
} from 'redux-saga/effects'
import api from '../services/api'

describe('auth duck', function() {
  describe('reducer', function() {
    it('should return default state for unknown action', function() {
      const state = {}
      expect(reducer(state, { type: 'random' })).toBe(state)
    })

    describe('successful auth', function() {
      it('should set user on sign up', function() {
        const user = {}
        const previousState = ReducerRecord()
        const action = { type: SIGN_UP_SUCCESS, payload: { user } }
        const nextState = reducer(previousState, action)
        expect(nextState.user).toBe(user)
      })

      it('should set user on sign in', function() {
        const user = {}
        const previousState = ReducerRecord()
        const action = { type: SIGN_IN_SUCCESS, payload: { user } }
        const nextState = reducer(previousState, action)
        expect(nextState.user).toBe(user)
      })
    })

    describe('to many auth errors', function() {
      it('should reset errors count on successful sign in', function() {
        const previousState = ReducerRecord()
        const action = { type: SIGN_IN_SUCCESS, payload: {} }
        const nextState = reducer(previousState, action)
        expect(nextState.numberOfRecentErrors).toEqual(0)
      })
      it('should reset errors count on successful sign up', function() {
        const previousState = ReducerRecord()
        const action = { type: SIGN_UP_SUCCESS, payload: {} }
        const nextState = reducer(previousState, action)
        expect(nextState.numberOfRecentErrors).toEqual(0)
      })
      it('should increment number of errors', function() {
        const previousState = ReducerRecord()
        const action = { type: SIGN_IN_ERROR, payload: {} }
        const nextState = reducer(previousState, action)
        expect(nextState.numberOfRecentErrors).toEqual(1)
      })
      describe('time passed', function() {
        it('should decrement number of errors', function() {
          const previousState = ReducerRecord().set('numberOfRecentErrors', 2)
          const action = { type: TIME_PASSED_AFTER_SIGN_IN_ERROR, payload: {} }
          const nextState = reducer(previousState, action)
          expect(nextState.numberOfRecentErrors).toEqual(1)
        })
        it('should not allow bring error count below zero', function() {
          const previousState = ReducerRecord()
          const action = { type: TIME_PASSED_AFTER_SIGN_IN_ERROR, payload: {} }
          const nextState = reducer(previousState, action)
          expect(nextState.numberOfRecentErrors).toEqual(0)
        })
      })
    })
  })

  describe('saga', function() {
    describe('sign up saga', function() {
      function sharedPath() {
        const payload = {
          email: 'email',
          password: 'password'
        }
        const gen = signUpSaga({ payload })
        expect(gen.next().value).toEqual(put({ type: SIGN_UP_START }))

        expect(gen.next().value).toEqual(
          call(api.signUp, payload.email, payload.password)
        )
        return gen
      }
      it('success path', function() {
        const gen = sharedPath()
        const user = { user: 'user' }
        expect(gen.next(user).value).toEqual(
          put({
            type: SIGN_UP_SUCCESS,
            payload: { user }
          })
        )
      })
      it('unhappy path', function() {
        const gen = sharedPath()
        const error = { message: 'pain' }

        expect(gen.throw(error).value).toEqual(
          put({
            type: SIGN_UP_ERROR,
            error
          })
        )
      })
    })
    describe('sign in saga', function() {
      it('2 success path in a row', function() {
        successPath()
        successPath()
      })
      it('unhappy path than success path', function() {
        errorPage()
        successPath()
      })
      function sharedPath() {
        const payload = {
          email: 'email',
          password: 'password'
        }
        const gen = signInSaga()
        expect(gen.next().value).toEqual(fork(toManySignErrorsSaga))
        expect(gen.next().value).toEqual(take(SIGN_IN_REQUEST))
        expect(gen.next({ payload }).value).toEqual(
          put({ type: SIGN_IN_START })
        )

        expect(gen.next().value).toEqual(
          call(api.signIn, payload.email, payload.password)
        )
        return gen
      }
      function successPath() {
        const gen = sharedPath()
        const user = { user: 'user' }
        expect(gen.next(user).value).toEqual(
          put({
            type: SIGN_IN_SUCCESS,
            payload: { user }
          })
        )
      }
      function errorPage() {
        const gen = sharedPath()
        const error = { message: 'pain' }

        expect(gen.throw(error).value).toEqual(
          put({
            type: SIGN_IN_ERROR,
            error
          })
        )
      }
    })
  })
})
