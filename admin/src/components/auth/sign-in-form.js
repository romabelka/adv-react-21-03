import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import store from '../../redux/index'

class SignInForm extends Component {
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
        <button>Sign In</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'sign-in',
  initialValues: {
    email: 'method_k@mail.ru',
    password: '123123123'
  }
})(SignInForm)
