import { put, call, take } from 'redux-saga/effects'
import api from '../services/api'
import {
  signUpSaga,
  signInSaga,
  signUp,
  signIn,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_IN_REQUEST
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
const signInAction = signIn(data.email, data.password)

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
  describe('signInSaga', () => {
    it('should sing in success', () => {
      const gen = signInSaga(signInAction)
      const next = gen.next().value
      expect(next).toEqual(take(SIGN_IN_REQUEST))
      expect(gen.next(next).value).toEqual(put({ type: SIGN_IN_START }))
      expect(gen.next().value).toEqual(
        call(api.signIn, next.email, next.password)
      )
      expect(gen.next(person).value).toEqual(
        put({ type: SIGN_IN_SUCCESS, payload: { user: person } })
      )
      expect(gen.next().done).toBe(false)
    })
    it('should sing in error', () => {
      const gen = signInSaga(signInAction)
      const next = gen.next().value
      expect(next).toEqual(take(SIGN_IN_REQUEST))
      expect(gen.next(next).value).toEqual(put({ type: SIGN_IN_START }))
      expect(gen.next().value).toEqual(
        call(api.signIn, next.email, next.password)
      )
      expect(gen.throw(error).value).toEqual(
        put({ type: SIGN_IN_ERROR, error: error })
      )
      expect(gen.next().done).toBe(false)
    })
  })
})
