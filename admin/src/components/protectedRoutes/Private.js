import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { isAuthorized } from '../../ducks/auth'

export const Private = ({ isAuthorized, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props) =>
      isAuthorized ? <Component {...props} /> : <Redirect to="/auth" />
    }
  />
)

export default connect((state) => ({
  isAuthorized: isAuthorized(state)
}))(Private)
