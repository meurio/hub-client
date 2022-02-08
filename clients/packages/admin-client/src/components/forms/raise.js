import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const Raise = ({ className, error, componentClass, ...props }) => {
  const Component = componentClass !== undefined ? componentClass : 'span'
  return (
    <Component className={classnames('red', className)} {...props}>{` - ${error}`}</Component>
  )
}

Raise.propTypes = {
  error: PropTypes.string.isRequired
}

export default Raise
