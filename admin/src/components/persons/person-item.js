import React from 'react'

const PersonItem = (props) => {
  const { firstName, lastName, email } = props.person
  return (
    <div style={{ marginBottom: '10px' }}>
      <div>
        First name:
        {firstName}
      </div>
      <div>
        Last name:
        {lastName}
      </div>
      <div>
        Email:
        {email}
      </div>
    </div>
  )
}

export default PersonItem
