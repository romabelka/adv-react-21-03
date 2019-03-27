import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form'
import authReducer, { moduleName as authModule } from '../ducks/auth'
import peopleReducer, { moduleName as peopleModule } from '../ducks/people'
import conferenceReducer, {
  moduleName as conferenceModule
} from '../ducks/conference'
import history from '../history'

export default combineReducers({
  router: connectRouter(history),
  form,
  [authModule]: authReducer,
  [peopleModule]: peopleReducer,
  [conferenceModule]: conferenceReducer
})
