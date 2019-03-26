import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect, compose } from 'react-redux'

class SignInForm extends Component {
  static propTypes = {}

  render() {
    const { disabled } = this.props
    const form = (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          Email:
          <Field component="input" name="email" />
        </div>
        <div>
          Password:
          <Field component="input" name="password" type="password" />
        </div>
        <button>Sign In</button>
      </form>
    )

    const needUpdate = (
      <div>
        <h3> you need refresh page, limit sing in</h3>
      </div>
    )

    return disabled ? needUpdate : form
  }
}

export default reduxForm({
  form: 'sign-in',
  initialValues: {
    email: 'foo',
    password: 'bar'
  }
})(SignInForm)
