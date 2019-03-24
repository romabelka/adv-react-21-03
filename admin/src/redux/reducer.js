import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import personReducer, { moduleName as personModule } from '../ducks/person'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  form,
  [authModule]: authReducer,
  [personModule]: personReducer
})
