import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import emailValidator from 'email-validator'

class AddUserForm extends Component {
  static propTypes = {}

  submitForm = (data) => {
    const { reset, addUser } = this.props
    addUser(data).then(() => {
      reset()
    })
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(this.submitForm)}>
        <div>
          First name:
          <Field component={ErrorField} name="firstname" />
        </div>
        <div>
          Last name:
          <Field component={ErrorField} name="lastname" />
        </div>
        <div>
          Email:
          <Field component={ErrorField} name="email" />
        </div>
        <button>Add user</button>
      </form>
    )
  }
}

const validate = ({ firstname, lastname, email }) => {
  const errors = {}

  if (!email) errors.email = 'email is a require field'
  else if (!emailValidator.validate(email)) errors.email = 'email is invalid'
  if (!firstname) errors.firstname = 'is require'
  if (!lastname) errors.lastname = 'is require'

  return errors
}

export default reduxForm({
  form: 'spreadsheet',
  validate
})(AddUserForm)
