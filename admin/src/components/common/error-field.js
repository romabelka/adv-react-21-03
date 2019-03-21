import React from 'react'

function ErrorField({ input, meta, ...rest }) {
  const { error, touched } = meta
  const errorText = touched && error && <p style={{ color: 'red' }}>{error}</p>
  return (
    <div>
      <input {...input} {...rest} />
      {errorText}
    </div>
  )
}

ErrorField.propTypes = {}

export default ErrorField
