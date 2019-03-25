import React from 'react'

function ErrorField({ input, meta: { error, touched }, type, label }) {
  const errorText = error && touched && (
    <div style={{ color: 'red' }}>{error}</div>
  )
  return (
    <div>
      <div>{label}</div>
      <div>
        <input {...input} type={type} />
      </div>
      {errorText}
    </div>
  )
}

ErrorField.propTypes = {}

export default ErrorField
