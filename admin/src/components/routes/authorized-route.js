import { Route } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import { isAuthorized } from '../../ducks/auth'

const AuthorizedRoute = ({
  path,
  AuthorizedComponent,
  NonAuthorizedComponent,
  isAuthorized
}) => (
  <Route
    path={path}
    component={() =>
      isAuthorized ? <AuthorizedComponent /> : <NonAuthorizedComponent />
    }
  />
)

export default connect((state) => ({
  isAuthorized: isAuthorized(state)
}))(AuthorizedRoute)
