import PropTypes from 'prop-types'
import React from 'react'

if (require('exenv').canUseDOM) require('./button.scss')

const Button = ({ children, label, onClick }) => {
  // TODO: Renderizar icone quando coluna estiver reduzida
  return (
    <div className='draft-widget-button col col-4 p1'>
      <button title={label} className='btn col-12' onClick={onClick}>
        <span className='content'>
          {children}
        </span>
      </button>
    </div>
  )
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Button
