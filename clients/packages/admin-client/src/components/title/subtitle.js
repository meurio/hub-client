import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

var styles = require('exenv').canUseDOM ? require('./subtitle.scss') : {}

const Subtitle = ({ children, className }) => (
  <span className={classnames(styles.subtitle, className)}>
    {children}
  </span>
)

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
}

export default Subtitle
