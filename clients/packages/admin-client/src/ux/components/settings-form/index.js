import PropTypes from 'prop-types'
import React from 'react'
import { FormattedMessage } from 'react-intl'

import DivFloat from '../div-float'
import Button from '../button'

// Dependency module
import { FormRedux, SuccessMessage } from 'components/forms'

const SettingsForm = ({ children, buttonText, successMessage, ...formProps }) => (
  <FormRedux nosubmit {...formProps}>
    {children}
    <DivFloat>
      <Button
        type='submit'
        disabled={formProps.submitting}
      >
        {buttonText || (
          <FormattedMessage
            id='ux.components--settings-form.button.text'
            defaultMessage='Salvar'
          />
        )}
      </Button>
      <SuccessMessage
        text={successMessage || (
          <FormattedMessage
            id='ux.components--settings-form.success-message'
            defaultMessage='Dados editados com sucesso'
          />
        )}
      />
    </DivFloat>
  </FormRedux>
)

SettingsForm.propTypes = {
  buttonText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  successMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default SettingsForm
