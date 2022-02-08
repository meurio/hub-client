import React from 'react'
import classnames from 'classnames'

export default (WrappedComponent) => {
  return class PP extends React.Component {
    render () {
      const colProps = {
        className: classnames('flex-auto', this.props.className)
      }

      return (
        <WrappedComponent {...this.props} {...colProps} />
      )
    }
  }
}
