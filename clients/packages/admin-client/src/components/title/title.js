import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

var styles = require('exenv').canUseDOM ? require('./title.scss') : {}

const Title = ({ children, size, className }) => (
  <span className={classnames(styles[`is-${size}`], className)}>
    {children}
  </span>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

Title.defaultProps = {
  size: 1
}

export default Title
