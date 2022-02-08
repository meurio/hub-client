import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

if (require('exenv').canUseDOM) {
  require('./tab-border.scss')
}

const TabBorder = ({ children, Component, path, className, isActive, style }) => {
  const optionalProps = {}

  if (path) optionalProps.to = path

  return (
    <Component
      {...optionalProps}
      className={classnames(
        'tab components--tab-border',
        { 'is-active': isActive },
        className
      )}
      style={style}
    >
      {children}
    </Component>
  )
}

TabBorder.propTypes = {
  children: PropTypes.node.isRequired,
  Component: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  path: PropTypes.string,
  isActive: PropTypes.bool,
  style: PropTypes.string
}

export default TabBorder
