import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const DropdownMenuItem = props => {
  const handleClick = event => {
    (props.onClick || props.disabled) && event && event.preventDefault()
    if (!props.disabled) {
      props.onItemClick && props.onItemClick()
      props.onClick && props.onClick()
    }
  }

  const { className, disabled, href, children } = props

  return (
    <a
      className={classnames(className, (disabled ? 'muted' : ''))}
      disabled={disabled}
      onClick={handleClick}
      href={href}>
      {children}
    </a>
  )
}

DropdownMenuItem.propTypes = {
  href: PropTypes.string,
  children: PropTypes.object,
  onClick: PropTypes.func,
  onItemClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default DropdownMenuItem
