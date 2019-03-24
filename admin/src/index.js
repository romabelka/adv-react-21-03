import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { initFirebase } from './firebaseManager'
import { ConnectedRouter } from 'connected-react-router'
import App from './app'
import store from './redux'
import history from './history'

initFirebase(store)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
