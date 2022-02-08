import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

if (require('exenv').canUseDOM) {
  require('./browsable-list.scss')
}

const BrowsableList = ({ children, className, style }) => (
  <div className={classnames('browsable-list rounded', className)} style={style}>
    {children}
  </div>
)

BrowsableList.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  style: PropTypes.object
}

export default BrowsableList
