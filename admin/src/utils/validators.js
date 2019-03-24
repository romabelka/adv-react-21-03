import emailValidator from 'email-validator'

const validators = {
  required: (value) => (value ? '' : 'Required'),

  email: (value) => (emailValidator.validate(value) ? '' : 'email is invalid'),

  minLength: (value, min) =>
    value && value.length < min ? `Must be ${min} characters or more` : '',

  minLength8: (value) => validators.minLength(value, 8)
}

export default validators
