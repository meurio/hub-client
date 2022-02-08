import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './'

const floatSubmitStyle = {
  color: 'rgb(54, 76, 85)',
  float: 'none',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  lineHeight: '24px',
  position: 'fixed',
  right: '64px',
  textAlign: 'right',
  top: '32px'
}

const successMessageStyle = {
  color: 'rgb(61, 153, 112)',
  fontFamily: '"Source Sans Pro", "Proxima Nova", sans-serif',
  fontSize: '16px',
  lineHeight: '24px',
  marginTop: '5px',
  textAlign: 'right'
}

const SettingsForm = ({
  children,
  // Provider form
  onSubmit,
  submitted,
  i18n,
  getPropI18n,
  // redux-form
  valid,
  error,
  submitting
}) => {
  const successMessage = getPropI18n('successMessage')
  const submitLabel = getPropI18n('submitLabel')
  return (
    <form onSubmit={onSubmit}>
      {children}
      <div style={floatSubmitStyle}>
        <Button
          style={{ display: 'inline-block' }}
          disabled={submitting}
          type='submit'
        >
          {submitLabel || i18n({
            id: 'settingsForm.submitLabel.default',
            defaultMessage: 'Salvar'
          })}
        </Button>
        {submitted && successMessage ? (
          <div style={successMessageStyle}>
            <span>{successMessage}</span>
            <i className='fa fa-check-circle olive ml1' />
          </div>
        ) : null}
        {error && (
          <div style={{...successMessageStyle, color: 'red'}}>
            {error}
          </div>
        )}
      </div>
    </form>
  )
}

SettingsForm.propTypes = {
  successMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default SettingsForm
