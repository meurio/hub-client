import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const SidenavList = ({ children, className, style }) => (
  <div
    className={classnames('items clearfix py2', className)}
    style={style}
  >
    {children}
  </div>
)

SidenavList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object
}

export default SidenavList
