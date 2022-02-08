import PropTypes from 'prop-types'
/*
 * Component: Button
 */
import React from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

if (require('exenv').canUseDOM) require('./styles.scss')

// TODO: Change to style component
const basscss = 'ux--button btn white caps p2 rounded h4 ml2'

const Button = ({ children, btnStyles, type, disabled, to, href, onClick }) => {
  const isSubmit = type !== 'submit'
  const className = classnames(
    basscss,
    isSubmit ? 'bg-gray' : 'bg-pagenta',
    disabled ? 'disabled' : null
  )

  if (href) return <a style={btnStyles} href={href} className={className} target='_blank' rel='noopener noreferrer'>{children}</a>
  if (to) return <Link style={btnStyles} to={to} className={className}>{children}</Link>

  return (
    <button
      styles={btnStyles}
      type={type}
      onClick={e => isSubmit && onClick(e)}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button']),
  disabled: PropTypes.bool,
  // Navigation
  to: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string
}

Button.defaultProps = {
  type: 'button'
}

export default Button
