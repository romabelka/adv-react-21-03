import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signUp, signIn, moduleName as authName } from '../../ducks/auth'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <Route
          path="/auth/sign-in"
          render={() => (
            <SignInForm
              onSubmit={this.handleSignIn}
              disabled={!this.props.count}
            />
          )}
        />
        <Route
          path="/auth/sign-up"
          render={() => <SignUpForm onSubmit={this.handleSignUp} />}
        />
      </div>
    )
  }

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}
const mapStateToProps = (state) => {
  const { count } = state[authName]
  return {
    count
  }
}

export default connect(
  mapStateToProps,
  {
    signIn,
    signUp
  }
)(AuthPage)
