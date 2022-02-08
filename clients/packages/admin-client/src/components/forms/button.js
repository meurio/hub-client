import React from 'react'

const Button = ({ children, type, className, pristine, submitting }) => (
  <button
    type={type}
    className={className}
    disabled={type === 'submit' ? pristine || submitting : false}
  >
    {children}
  </button>
)

Button.defaultProps = {
  type: 'button'
}

export default Button
