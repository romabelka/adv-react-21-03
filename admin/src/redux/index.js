import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { init as initAuth } from '../ducks/auth'
import reducer from './reducer'
import history from '../history'

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger)

const store = createStore(reducer, enhancer)

initAuth(store)

//dev only!!!!
window.store = store

export default store
