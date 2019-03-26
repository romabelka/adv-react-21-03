import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signUp, signIn, isSignInForbidden } from '../../ducks/auth'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <Route path="/auth/sign-in" render={this.renderSignInForm} />
        <Route
          path="/auth/sign-up"
          render={() => <SignUpForm onSubmit={this.handleSignUp} />}
        />
      </div>
    )
  }

  renderSignInForm = () => {
    const { isForbidden } = this.props
    if (isForbidden) return <h3>You have exceeded the failed login limit.</h3>
    return <SignInForm onSubmit={this.handleSignIn} />
  }

  handleSignIn = ({ email, password }) =>
    !this.props.isForbidden && this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(
  (state) => ({
    isForbidden: isSignInForbidden(state)
  }),
  {
    signIn,
    signUp
  }
)(AuthPage)
