import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <Route
          path="/auth/sign-in"
          render={() => <SignInForm onSubmit={this.handleSignIn} />}
        />
        <Route
          path="/auth/sign-up"
          render={() => <SignUpForm onSubmit={this.handleSignUp} />}
        />
        <SignUpForm onSubmit={this.handleSignIn} />
      </div>
    )
  }

  handleSignIn = (values) => console.log('sign in: ', values)
  handleSignUp = (values) => console.log('sign up: ', values)
}

export default AuthPage
