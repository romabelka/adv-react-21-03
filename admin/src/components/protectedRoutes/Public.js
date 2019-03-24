import React from 'react'
import { Route } from 'react-router-dom'

export const Public = ({ component: Component, ...rest }) => (
  <Route {...rest} component={(props) => <Component {...props} />} />
)

export default Public
