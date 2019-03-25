import { put, call } from 'redux-saga/effects'
import { reset } from 'redux-form'
import { ADD_PERSON, addPerson, addPersonSaga } from './people'
import { generateId } from './utils'

describe('People Duck', () => {
  describe('addPersonSaga', () => {
    it('should add a person', () => {
      const person = {
        firstName: 'Roman',
        lastName: 'Yakobchuk',
        email: 'test@example.com'
      }

      const action = addPerson(person)

      const gen = addPersonSaga(action)

      expect(gen.next().value).toEqual(call(generateId))

      const id = generateId()

      expect(gen.next(id).value).toEqual(
        put({
          type: ADD_PERSON,
          payload: { ...person, id }
        })
      )

      expect(gen.next().value).toEqual(put(reset('person')))

      expect(gen.next().done).toBe(true)
    })
  })
})
