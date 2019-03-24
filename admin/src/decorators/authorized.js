import React from 'react'

export default (OriginComponent) =>
  class AuthorizedComponent extends React.Component {
    render() {
      const { isAuthorized } = this.props
      if (!isAuthorized) return <h1>Not Authorized !!!</h1>

      return <OriginComponent {...this.props} />
    }
  }
