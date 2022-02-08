import React from 'react'
import ApplicationContextTypes from './types'

class Wrapper extends React.Component {
  render () {
    const { children, component: Component, ...props } = this.props
    const { app } = this.context
    return (
      <Component {...props} app={app}>
        {children}
      </Component>
    )
  }
}

Wrapper.contextTypes = ApplicationContextTypes

export default Wrapper
