import { put, call } from 'redux-saga/effects'
import {
  signUp,
  signUpSaga,
  signIn,
  signInSaga,
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_IN_START,
  SIGN_IN_SUCCESS
} from './auth'
import api from '../services/api'

describe('Auth Duck', () => {
  describe('Sign up', () => {
    it('should sign up user', () => {
      const userData = {
        email: 'test@example.com',
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
  describe('Sign in', () => {
    it('signInSaga should sign in user', () => {
      const userData = {
        email: 'test1@example.com',
        password: '123456789'
      }

      const gen = signInSaga(userData)

      expect(gen.next().value).toEqual(
        put({
          type: SIGN_IN_START
        })
      )

      const user = call(api.signIn, userData.email, userData.password)

      expect(gen.next().value).toEqual(user)

      expect(gen.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )
    })
    it('signInSagaLoop should sign in user', () => {
      const userData = {
        email: 'test1@example.com',
        password: '123456789'
      }

      const gen = signInSaga(userData)

      expect(gen.next().value).toEqual(
        put({
          type: SIGN_IN_START
        })
      )

      const user = call(api.signIn, userData.email, userData.password)

      expect(gen.next().value).toEqual(user)

      expect(gen.next(user).value).toEqual(
        put({
          type: SIGN_IN_SUCCESS,
          payload: { user }
        })
      )
    })
  })
})
