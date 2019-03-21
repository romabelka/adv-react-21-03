import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'

class SignInForm extends Component {
  static propTypes = {}

  render() {
    return (
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
  }
}

export default reduxForm({
  form: 'sign-in',
  initialValues: {
    email: 'foo',
    password: 'bar'
  }
})(SignInForm)
