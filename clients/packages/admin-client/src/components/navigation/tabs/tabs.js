import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const Tabs = ({ children, className, style }) => (
  <nav
    className={classnames('tabs gray20', className)}
    style={style}
  >
    {children}
  </nav>
)

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.string
}

export default Tabs
