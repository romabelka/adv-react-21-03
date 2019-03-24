import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import validators from '../../utils/validators'

class SignUpForm extends Component {
  static propTypes = {}

  render() {
    console.log(validators)
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          Email:
          <Field
            validate={[validators.required, validators.email]}
            component={ErrorField}
            name="email"
          />
        </div>
        <div>
          Password:
          <Field
            validate={[validators.required, validators.minLength8]}
            component={ErrorField}
            name="password"
          />
        </div>
        <button>Sign Up</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'sign-up'
})(SignUpForm)
