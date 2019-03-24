import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import ErrorField from '../common/error-field'

class AddPersonForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func
  }

  onSubmit = (values) => {
    this.props.handleSubmit(values)
    this.props.reset()
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          First name:
          <Field component={ErrorField} name="firstName" />
        </div>
        <div>
          Last name:
          <Field component={ErrorField} name="lastName" />
        </div>
        <div>
          Email:
          <Field component={ErrorField} name="email" />
        </div>
        <button type="submit">Add new person</button>
        <button type="button" onClick={this.props.reset}>
          Clear
        </button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'add-new-person'
})(AddPersonForm)
