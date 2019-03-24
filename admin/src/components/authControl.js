import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { isAuthorized } from '../ducks/auth'

const authControl = (
  ExpectedComponent,
  shouldBeAuthorized,
  redirectTo,
  additionalProps
) => {
  const AuthControlComponent = (props) => {
    const { isAuthorized } = props

    if (isAuthorized === shouldBeAuthorized) {
      return <ExpectedComponent {...props} {...additionalProps} />
    } else if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return null
  }

  return connect((state) => ({
    isAuthorized: isAuthorized(state)
  }))(AuthControlComponent)
}

export default authControl
