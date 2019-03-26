import { put, call } from 'redux-saga/effects'
import {
  signUp,
  signUpSaga,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'
import api from '../services/api'
import { generateId } from './utils'

describe('Auth Duck', () => {
  describe('Sign up', () => {
    it('should sign up user', () => {
      const userData = {
        email: `test${generateId()}@example.com`,
        password: '123456789'
      }

      const action = signUp(userData.email, userData.password)

      const gen = signUpSaga(action)

      expect(gen.next().value).toEqual(
        put({
          type: SIGN_UP_START
        })
      )

      const user = call(api.signUp, userData.email, userData.password)

      expect(gen.next().value).toEqual(user)

      expect(gen.next(user).value).toEqual(
        put({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        })
      )
    })
  })
})
