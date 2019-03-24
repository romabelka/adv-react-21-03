import React, { Component } from 'react'
import { reset, reduxForm, Field } from 'redux-form'
import emailValidator from 'email-validator'
import ErrorField from '../common/error-field'

class AddPerson extends Component {
  render() {
    return (
      <>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            Name:
            <Field component={ErrorField} name="name" />
          </div>
          <div>
            Surname:
            <Field component={ErrorField} name="surname" />
          </div>
          <div>
            Email:
            <Field component={ErrorField} name="email" />
          </div>
          <button>Add person</button>
        </form>
      </>
    )
  }
}

const validate = ({ email }) => {
  const errors = {}
  if (!email) errors.email = 'required'
  if (!emailValidator.validate(email)) errors.email = 'invalid email'
  return errors
}

const afterSubmit = (result, dispatch) => dispatch(reset('add-person'))

export default reduxForm({
  form: 'add-person',
  validate,
  onSubmitSuccess: afterSubmit
})(AddPerson)
