import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  success,
  buttonText,
  loading,
  mobilization: { body_font: bodyFont }
}) => (
  <div style={{ fontFamily: bodyFont }}>
    <button
      type='submit'
      disabled={loading}
      className='caps btn bg-darken-4 p2 col-12 mt1 mb2 rounded white'
    >
      {loading ? 'Enviando...' : buttonText}
    </button>
    {success && (
      <div className='center'>Sua ação foi registrada com sucesso!</div>
    )}
  </div>
)

Button.propTypes = {
  success: PropTypes.bool.isRequired,
  buttonText: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  mobilization: PropTypes.object.isRequired
}

export default Button
