import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'
import validators from '../../utils/validators'

class AddPersonForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div>
          First name:
          <Field
            validate={[validators.required]}
            component={ErrorField}
            name="firstName"
          />
        </div>
        <div>
          Last name:
          <Field
            validate={[validators.required]}
            component={ErrorField}
            name="lastName"
          />
        </div>
        <div>
          Email:
          <Field
            validate={[validators.required, validators.email]}
            component={ErrorField}
            name="email"
          />
        </div>
        <button type="submit">Add new person</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'add-new-person'
})(AddPersonForm)
