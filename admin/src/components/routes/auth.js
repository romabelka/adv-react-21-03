import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signUp, signIn } from '../../ducks/auth'
import authControl from '../authControl'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <Route
          path="/auth/sign-in"
          component={authControl(SignInForm, false, '/admin/', {
            onSubmit: this.handleSignIn
          })}
        />
        <Route
          path="/auth/sign-up"
          component={authControl(SignUpForm, false, '/admin/', {
            onSubmit: this.handleSignUp
          })}
        />
      </div>
    )
  }

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(
  null,
  {
    signIn,
    signUp
  }
)(AuthPage)
