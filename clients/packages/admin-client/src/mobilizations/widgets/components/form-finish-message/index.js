import React from 'react'
import {
  bool,
  oneOfType,
  func,
  node,
  object,
  string
} from 'prop-types'
import {
  FormattedMessage,
  intlShape,
  injectIntl
} from 'react-intl'
import { reduxForm } from 'redux-form'

import {
  FormGroup,
  RadioGroup,
  Radio,
  ControlLabel,
  HelpBlock,
  FormControl
} from 'components/forms'
import { SettingsForm } from 'ux/components'
import Editor from 'components/editor-draft-js'
import EditorSlate, {
  createEditorContent
} from 'mobilizations/widgets/__plugins__/content/components/editor-slate'
import * as styles from './index-scss'

export const FormFinishMessage = props => {
  const {
    mobilization,
    fields,
    successMessage,
    widget,
    intl,
    TellAFriend,
    FinishPostDonation,
    ...formProps
  } = props

  const { color_scheme: colorScheme } = mobilization

  const {
    finish_message_type: finishMessageType,
    finish_message: finishMessage,
    whatsapp_text: whatsappText
  } = fields

  let parsedFinishMessage
  try {
    parsedFinishMessage = JSON.parse(finishMessage.value)
  } catch (e) {
    parsedFinishMessage = finishMessage.value
  }

  return (
    <SettingsForm
      {...formProps}
      onSubmit={values => {
        return props.asyncWidgetUpdate({
          ...widget,
          settings: { ...widget.settings, ...values }
        })
      }}
      successMessage={successMessage || (
        <FormattedMessage
          id='widgets.components--form-finish-message.success-message'
          defaultMessage='Formulário salvo com sucesso!'
        />
      )}
    >
      <FormGroup controlId='finish-message-type-id' {...finishMessageType}>
        <ControlLabel>
          <FormattedMessage
            id='widgets.components--form-finish-message.type.label'
            defaultMessage='Tipo de mensagem'
          />
        </ControlLabel>
        <RadioGroup>
          <Radio value='share'>
            <FormattedMessage
              id='widgets.components--form-finish-message.type.radio.share'
              defaultMessage='Compartilhar'
            />
          </Radio>
          <Radio value='custom'>
            <FormattedMessage
              id='widgets.components--form-finish-message.type.radio.custom'
              defaultMessage='Customizar'
            />
          </Radio>
          {widget.kind === 'donation' &&
            widget.settings.payment_type === 'unique' && (
            <Radio value='donation-recurrent'>
              <FormattedMessage
                id='widgets.components--form-finish-message.type.radio.donation-recurrent'
                defaultMessage='Doação recorrente'
              />
            </Radio>
          )}
          {finishMessageType.value === 'donation-recurrent' &&
          widget.kind === 'donation' && (
            <HelpBlock>
              <FormattedMessage
                id='widgets.components--form-finish-message.type.radio.donation-recurrent.helper-text'
                defaultMessage={
                  'O doador recebe a opção de seguir doando todo mês e se tornar um doador' +
                  ' recorrente. Em seguida, visualiza a mensagem padrão de compartilhamento'
                }
              />
            </HelpBlock>
          )}
        </RadioGroup>
      </FormGroup>

      {finishMessageType.value !== 'custom' && (
        <div>
          <FormGroup controlId='whatsapp-text-id' {...whatsappText}>
            <ControlLabel>
              <i className='fa fa-whatsapp mr2' style={styles.whatsappControlLabel} />
              <FormattedMessage
                id='widgets.components--form-finish-message.share.whatsapp-text.label'
                defaultMessage='Texto do WhatsApp'
              />
            </ControlLabel>
            <FormControl
              rows='4'
              componentClass='textarea'
              placeholder={
                intl.formatMessage({
                  id: 'widgets.components--form-finish-message.share.whatsapp-text.placeholder',
                  defaultMessage: 'Faça um texto curto, capaz de motivar outras pessoas a se unirem à sua mobilização. Você poderá alterar este texto depois.'
                })
              }
            />
          </FormGroup>
        </div>
      )}

      <label className='h5 darkengray caps mb1 block'>
        <FormattedMessage
          id='widgets.components--form-finish-message.preview.label'
          defaultMessage='Preview'
        />
      </label>
      {finishMessageType.value === 'share' && (
        <TellAFriend preview mobilization={mobilization} widget={widget} />
      )}
      {finishMessageType.value === 'donation-recurrent' &&
       widget.kind === 'donation' && (
        <div style={styles.previewFinishPostDonation}>
          <FinishPostDonation preview mobilization={mobilization} widget={widget} />
        </div>
      )}
      {finishMessageType.value === 'custom' && (
        <div className='widget-finish-message-custom'>
          <div className='relative'>
            <input type='hidden' name='finish_message' />
            <input type='hidden' name='finish_message_background' />
            {parsedFinishMessage.constructor === Object && parsedFinishMessage.entityMap ? (
              <Editor
                value={parsedFinishMessage}
                theme={colorScheme.replace('-scheme', '')}
                toolbarContainerStyle={styles.editorToolbarContainer}
                toolbarStyle={styles.editorToolbar}
                containerStyle={styles.editorContainer}
                focusStyle={styles.editorFocus}
                editorStyle={styles.editor}
                handleSave={rawContent => { finishMessage.onChange(JSON.stringify(rawContent)) }}
              />
            ) : (
              <EditorSlate
                content={finishMessage.value}
                handleSave={value => {
                  const raw = JSON.stringify(value.toJSON())
                  if (finishMessage.value !== raw) finishMessage.onChange(raw)
                }}
                toolbarStyles={{ position: 'relative', marginBottom: 10, zIndex: 5 }}
                contentStyles={{ backgroundColor: '#fff', color: '#666', padding: 10 }}
              />
            )}
          </div>
        </div>
      )}
    </SettingsForm>
  )
}

// Redux Form configurations
const fields = [
  'finish_message_type',
  'finish_message',
  'finish_message_background',
  'whatsapp_text'
]

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.finish_message_type) {
    errors.finish_message_type = intl.formatMessage({
      id: 'widgets.components--form-finish-message.type.validation.required',
      defaultMessage: 'Nenhum tipo de mensagem foi selecionado'
    })
  }
  return errors
}

const mapStateToProps = (state, props) => {
  const settings = props.widget.settings || {}
  const { intl } = props
  return {
    initialValues: {
      finish_message_type: settings.finish_message_type || 'share',
      finish_message: settings.finish_message ||
      createEditorContent(intl.formatMessage({
        id: 'widgets.components--form-finish-message.custom.message.default',
        defaultMessage: 'Clique aqui para editar...'
      })),
      finish_message_background: settings.finish_message_background || '255,255,255,1',
      whatsapp_text: settings.whatsapp_text || ''
    }
  }
}

//
// PropTypes
//
FormFinishMessage.propTypes = {
  // Injected components
  TellAFriend: oneOfType([node, func]).isRequired,
  FinishPostDonation: oneOfType([node, func]).isRequired,
  // Form Redux
  fields: object.isRequired,
  submitting: bool.isRequired,
  error: string,
  successMessage: string,
  // Injected by components
  mobilization: object.isRequired,
  widget: object.isRequired,
  asyncWidgetUpdate: func.isRequired,
  // translation
  intl: intlShape.isRequired
}

export default injectIntl(
  reduxForm(
    { form: 'formFinishMessage', fields, validate },
    mapStateToProps
  )(FormFinishMessage)
)
