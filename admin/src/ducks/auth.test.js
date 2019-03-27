import { put, call } from 'redux-saga/effects'
import api from '../services/api'
import {
  signUpSaga,
  signInSaga,
  signUp,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR
} from './auth'

const data = {
  password: '11111111',
  email: 'test@example.com'
}

const person = {
  firstName: 'Roman',
  lastName: 'Yakobchuk',
  email: 'test@example.com'
}

const error = new Error('error')

const signUpAction = signUp(data.email, data.password)

describe('Auth Duck', () => {
  describe('signUpSaga', () => {
    it('should sing up success', () => {
      const gen = signUpSaga(signUpAction)
      expect(gen.next().value).toEqual(put({ type: SIGN_UP_START }))
      expect(gen.next().value).toEqual(
        call(api.signUp, data.email, data.password)
      )
      expect(gen.next(person).value).toEqual(
        put({ type: SIGN_UP_SUCCESS, payload: { user: person } })
      )
      expect(gen.next().done).toBe(true)
    })
    it('should sing up error', () => {
      const gen = signUpSaga(signUpAction)
      expect(gen.next().value).toEqual(put({ type: SIGN_UP_START }))
      expect(gen.next().value).toEqual(
        call(api.signUp, data.email, data.password)
      )
      expect(gen.throw(error).value).toEqual(
        put({ type: SIGN_UP_ERROR, error: error })
      )
      expect(gen.next().done).toBe(true)
    })
  })
})
