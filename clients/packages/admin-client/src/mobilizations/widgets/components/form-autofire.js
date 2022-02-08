import React from 'react'
import PropTypes from 'prop-types'

import { FormattedMessage, intlShape } from 'react-intl'
import { FormGroup, ControlLabel, FormControl } from 'components/forms'
import { SettingsForm } from 'ux/components'
import * as validator from 'utils/validation-helper'

const FormAutofire = props => {
  const {
    fields: {
      sender_name: senderName,
      sender_email: senderEmail,
      email_subject: emailSubject,
      email_text: emailText
    },
    widget,
    asyncWidgetUpdate,
    intl,
    ...rest
  } = props

  return (
    <SettingsForm
      {...rest}
      buttonText={
        <FormattedMessage
          id='widgets.components--form-autofire.form.submit-button'
          defaultMessage='Salvar'
        />
      }
      onSubmit={values => {
        const settings = widget.settings || {}
        return asyncWidgetUpdate({ ...widget, settings: { ...settings, ...values } })
      }}
      successMessage={
        intl.formatMessage({
          id: 'widgets.components--form-autofire.form.success-message',
          defaultMessage: 'Mensagem de agradecimento configurada com sucesso!'
        })
      }
    >
      <FormGroup controlId='senderName' {...senderName}>
        <ControlLabel>
          <FormattedMessage
            id='widgets.components--form-autofire.form.sender-name.label'
            defaultMessage='Nome do remetente'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={
            intl.formatMessage({
              id: 'widgets.components--form-autofire.form.sender-name.placeholder',
              defaultMessage: 'Defina o nome que irá aparecer na mensagem enviada.'
            })
          }
        />
      </FormGroup>
      <FormGroup controlId='senderEmail' {...senderEmail}>
        <ControlLabel>
          <FormattedMessage
            id='widgets.components--form-autofire.form.sender-email.label'
            defaultMessage='E-mail remetente'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={
            intl.formatMessage({
              id: 'widgets.components--form-autofire.form.sender-email.placeholder',
              defaultMessage: 'Defina o e-mail que irá aparecer na mensagem enviada.'
            })
          }
        />
      </FormGroup>
      <FormGroup controlId='emailSubject' {...emailSubject}>
        <ControlLabel>
          <FormattedMessage
            id='widgets.components--form-autofire.form.email-subject.label'
            defaultMessage='Assunto do e-mail'
          />
        </ControlLabel>
        <FormControl
          type='text'
          placeholder={
            intl.formatMessage({
              id: 'widgets.components--form-autofire.form.email-subject.placeholder',
              defaultMessage: 'Defina o assunto que irá aparecer na mensagem enviada.'
            })
          }
        />
      </FormGroup>
      <FormGroup controlId='emailText' {...emailText}>
        <ControlLabel>
          <FormattedMessage
            id='widgets.components--form-autofire.form.email-text.label'
            defaultMessage='Email de agradecimento'
          />
        </ControlLabel>
        <FormControl
          componentClass='textarea'
          rows='6'
          placeholder={
            intl.formatMessage({
              id: 'widgets.components--form-autofire.form.email-text.placeholder',
              defaultMessage: 'Ex: Obrigado por apostar na força da ação coletiva em rede. Sua' +
                ' participação é muito importante e, agora, precisamos da sua ajuda para que mais' +
                ' gente colabore com esta mobilização. Compartilhe nas suas redes clicando em um' +
                ' dos links abaixo. Um abraço.'
            })
          }
        />
      </FormGroup>
    </SettingsForm>
  )
}

FormAutofire.propTypes = {
  fields: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Translation
  intl: intlShape.isRequired
}

export const fields = ['sender_name', 'sender_email', 'email_subject', 'email_text']

export const validate = (values, { intl }) => {
  const errors = {}
  if (!validator.isValidEmail(values.sender_email)) {
    errors.sender_email = intl.formatMessage({
      id: 'widgets.components--form-autofire.form.sender-email.validation.invalid-email-format',
      defaultMessage: 'Informe um e-mail inválido'
    })
  }
  return errors
}

export default FormAutofire
