import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import { init as initAuth } from '../ducks/auth'
import reducer from './reducer'
import history from '../history'
import saga from './saga'

const sagaMiddleware = createSagaMiddleware()

const enhancer = applyMiddleware(
  thunk,
  sagaMiddleware,
  routerMiddleware(history),
  logger
)

const store = createStore(reducer, enhancer)

sagaMiddleware.run(saga)

initAuth(store)

//dev only!!!!
window.store = store

export default store
