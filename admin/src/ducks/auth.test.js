import {
  SIGN_IN_ERROR,
  SIGN_IN_FORBIDDEN,
  SIGN_IN_MAX_FAILED_ATTEMPTS,
  SIGN_IN_REQUEST,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  signIn,
  signInSaga,
  signUp,
  signUpSaga
} from './auth'
import { put, call, take } from 'redux-saga/effects'
import api from '../services/api'

describe('Auth duc', () => {
  describe('signUpSaga', () => {
    it('should register a new user', () => {
      const user = { email: 'test@gmail.com', password: 'qwerty' }

      const action = signUp(user.email, user.password)
      const gen = signUpSaga(action)

      expect(gen.next().value).toEqual(put({ type: SIGN_UP_START }))

      expect(gen.next().value).toEqual(
        call(api.signUp, user.email, user.password)
      )

      expect(gen.next(user).value).toEqual(
        put({ type: SIGN_UP_SUCCESS, payload: { user } })
      )

      expect(gen.next().done).toBe(true)
    })
  })
  describe('signInSaga', () => {
    it('should sing in user', () => {
      const user = { email: 'test@gmail.com', password: 'qwerty' }

      const action = signIn(user.email, user.password)
      const gen = signInSaga(action)

      expect(gen.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(gen.next({ payload: user }).value).toEqual(
        put({ type: SIGN_IN_START })
      )

      expect(gen.next().value).toEqual(
        call(api.signIn, user.email, user.password)
      )
      expect(gen.next(user).value).toEqual(
        put({ type: SIGN_IN_SUCCESS, payload: { user } })
      )
    })

    it('should block too many failed login attempts', () => {
      const user = { email: 'test@gmail.com', password: 'qwerty' }
      const action = signIn(user.email, user.password)
      const gen = signInSaga(action)

      const run = (isBlocked) => {
        if (isBlocked) {
          console.log('sing in should be blocked')
          expect(gen.next().value).toEqual(put({ type: SIGN_IN_FORBIDDEN }))
        } else {
          // take(SIGN_IN_REQUEST)
          gen.next()

          // put({type:SIGN_IN_START})
          gen.next({ payload: user })

          const exception = 'some exception'
          gen.next()
          expect(gen.throw(exception).value).toEqual(
            put({ type: SIGN_IN_ERROR, error: exception })
          )

          console.log('sing in error')
        }
      }

      for (let i = 0; i < SIGN_IN_MAX_FAILED_ATTEMPTS; i++) {
        run(false)
      }

      run(true)
      run(true)
    })
  })
})
