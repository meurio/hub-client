import React from 'react'
import { FormattedMessage } from 'react-intl'
import Button from '../button'

if (require('exenv').canUseDOM) require('./styles.scss')

const Dialog = ({ children, onConfirm, onCancel }) => (
  <div className='dialog--out'>
    <div className='dialog'>
      <div className='content--dialog'>
        {children}
      </div>
      <div className='footer--dialog'>
        <Button onClick={onConfirm}>
          <FormattedMessage
            id='ux.components--dialog.button.confirm.text'
            defaultMessage='Confirmar'
          />
        </Button>
        <Button onClick={onCancel}>
          <FormattedMessage
            id='ux.components--dialog.button.cancel.text'
            defaultMessage='Cancelar'
          />
        </Button>
      </div>
    </div>
  </div>
)

export default Dialog
