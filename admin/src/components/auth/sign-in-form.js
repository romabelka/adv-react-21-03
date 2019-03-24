import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import validators from '../../utils/validators'
import ErrorField from '../common/error-field'

class SignInForm extends Component {
  static propTypes = {}

  render() {
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
            type="password"
          />
        </div>
        <button>Sign In</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'sign-in'
  // initialValues: {
  //   email: 'foo',
  //   password: 'bar'
  // }
})(SignInForm)
