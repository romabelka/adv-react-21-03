import { put, call } from 'redux-saga/effects'
import {
  signUpSaga,
  signUp,
  SIGN_UP_START,
  SIGN_UP_SUCCESS
} from '../ducks/auth'
import ApiService from '../services/api'

describe('auth duck', () => {
  describe('sign up saga', () => {
    const user = {
      email: 'jelly@bean.candy',
      password: '000111'
    }
    const signUpAction = signUp(user.email, user.password)

    const gen = signUpSaga(signUpAction)

    expect(gen.next().value).toEqual(put({ type: SIGN_UP_START }))

    expect(gen.next().value).toEqual(
      call(ApiService.signUp, user.email, user.password)
    )

    expect(gen.next(user)).toEqual(
      put({ type: SIGN_UP_SUCCESS, payload: { user } })
    )
  })
})
