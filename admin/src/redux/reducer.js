import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import personsReducer, { moduleName as personsModule } from '../ducks/persons'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  form,
  [authModule]: authReducer,
  [personsModule]: personsReducer
})
