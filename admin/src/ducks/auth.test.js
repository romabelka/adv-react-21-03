import { put, call, take, select } from 'redux-saga/effects'
import {
  SIGN_UP_ERROR,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_IN_REQUEST,
  signIn,
  signUp,
  signInSaga,
  signUpSaga,
  attemptSelector,
  SIGN_IN_START,
  SIGN_IN_SUCCESS
} from './auth'
import api from '../services/api'

describe('Auth Duck', () => {
  describe('signUp Saga', () => {
    it('should create new user', async () => {
      const credential = {
        email: `${Math.random()}@example.com`,
        pass: '123123123'
      }

      const action = signUp(credential.email, credential.pass)

      const { payload } = action

      const gen = signUpSaga(action)

      expect(gen.next().value).toEqual(put({ type: SIGN_UP_START }))

      expect(gen.next().value).toEqual(
        call(api.signUp, payload.email, payload.password)
      )

      try {
        const user = await api.signUp(payload.email, payload.password)

        expect(gen.next(user).value).toEqual(
          put({
            type: SIGN_UP_SUCCESS,
            payload: { user }
          })
        )
      } catch (error) {
        expect(gen.throw(error).value).toEqual(
          put({
            type: SIGN_UP_ERROR,
            error
          })
        )
      }

      expect(gen.next().done).toBe(true)
    })
  })
  describe('signIn Saga', () => {
    it('should login user', async () => {
      const credential = {
        email: `qe@example.com`,
        pass: '123123123'
      }

      let attemptCount = 0

      const action = signIn(credential.email, credential.pass)

      const { payload } = action

      const gen = signInSaga()

      expect(gen.next().value).toEqual(take(SIGN_IN_REQUEST))

      expect(gen.next(action).value).toEqual(select(attemptSelector))

      expect(gen.next(attemptCount).value).toEqual(put({ type: SIGN_IN_START }))

      expect(gen.next().value).toEqual(
        call(api.signIn, payload.email, payload.password)
      )

      try {
        const user = await api.signIn(payload.email, payload.password)

        expect(gen.next(user).value).toEqual(
          put({
            type: SIGN_IN_SUCCESS,
            payload: { user, attempt: 0 }
          })
        )
      } catch (error) {
        expect(gen.throw(error).value).toEqual(
          put({
            type: SIGN_IN_ERROR,
            payload: { attempt: attemptCount + 1 },
            error
          })
        )
      }
    })
  })
})
