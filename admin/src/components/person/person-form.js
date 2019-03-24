import React from 'react'
import ErrorField from '../common/error-field'
import { Field, reduxForm } from 'redux-form'
import * as emailValidator from 'email-validator'

class PersonForm extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div>
            First Name: <Field component={ErrorField} name="firstName" />
          </div>
          <div>
            Last Name: <Field component={ErrorField} name="lastName" />
          </div>
          <div>
            Email: <Field component={ErrorField} name="email" />
          </div>
          <button>Save user</button>
        </form>
      </div>
    )
  }
}

const validate = ({ firstName, lastName, email }) => {
  const errors = {}

  if (!email) errors.email = 'email is a require field'
  else if (!emailValidator.validate(email)) errors.email = 'email is invalid'

  if (!firstName) errors.firstName = 'First Name is a require field'
  if (!lastName) errors.lastName = 'Last Name is a require field'

  return errors
}

export default reduxForm({
  form: 'person-form',
  validate
})(PersonForm)
