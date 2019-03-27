import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/sign-in-form'
import SignUpForm from '../auth/sign-up-form'
import { signUp, signIn } from '../../ducks/auth'
import EventsTable from './EventsTable'

class AuthPage extends Component {
  static propTypes = {}

  render() {
    const signIn = (
      <Route
        path="/auth/sign-in"
        render={() => <SignInForm onSubmit={this.handleSignIn} />}
      />
    )
    return (
      <div>
        <h1>Auth Page</h1>
        {this.props.auth.times === 3 ? <h1>U tried too hard</h1> : signIn}
        <Route
          path="/auth/sign-up"
          render={() => <SignUpForm onSubmit={this.handleSignUp} />}
        />
        <Route path="/auth/events" render={() => <EventsTable />} />
      </div>
    )
  }

  handleSignIn = ({ email, password }) => this.props.signIn(email, password)
  handleSignUp = ({ email, password }) => this.props.signUp(email, password)
}

export default connect(
  (state) => ({ auth: state.auth }),
  {
    signIn,
    signUp
  }
)(AuthPage)
