import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

class SignUpForm extends Component {
  static propTypes = {}

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          Email:
          <Field component={ErrorField} name="email" />
        </div>
        <div>
          Password:
          <Field component={ErrorField} name="password" type="password" />
        </div>
        <button>Sign Up</button>
      </form>
    )
  }
}

const validate = ({ email, password }) => {
  const errors = {}

  if (!email) errors.email = 'email is a require field'
  else if (!emailValidator.validate(email)) errors.email = 'email is invalid'
  if (!password) errors.password = 'password is a require field'
  else if (password.length < 8) errors.password = 'password is to short'

  return errors
}

export default reduxForm({
  form: 'sign-up',
  validate
})(SignUpForm)
