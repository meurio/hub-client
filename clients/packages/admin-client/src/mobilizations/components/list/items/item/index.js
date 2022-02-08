import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

// Current module dependencies
if (require('exenv').canUseDOM) {
  require('./index.scss')
}

const Item = ({ children, className, onClick }) => (
  <div
    className={classnames(
      'item bg-white block clearfix relative',
      className
    )}
    onClick={onClick}
  >
    {children}
  </div>
)

Item.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default Item

const Header = ({ children }) => (
  <div className='item-header block clearfix caps mb2'>
    <div className='item-header-avatar avatar-width left pr3' />
    <div className='overflow-hidden'>
      {children}
    </div>
  </div>
)
Item.Header = Header
Item.Header.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ])
}
