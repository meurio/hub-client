import PropTypes from 'prop-types'
import React from 'react'

if (require('exenv').canUseDOM) require('./styles.scss')

const DropdownMenu = ({ inline, items }) => (
  <div className='dropdown--menu'>
    {!inline && <i className='fa fa-ellipsis-h' />}
    <div className={`dropdown--content${inline ? ' inline' : ''}`}>
      {items.map((item, index) => (
        <div
          key={`dropdown-item-${index}`}
          className='dropdown--item'
          onClick={item.onClick}
          title={item.text}
        >
          {item.icon && (<i className={item.icon} />)}
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  </div>
)

DropdownMenu.propTypes = {
  inline: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    text: PropTypes.text,
    onClick: PropTypes.func
  })).isRequired
}

export default DropdownMenu
