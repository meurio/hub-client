/**
 * AdjustmentsForm
 *
 * Um componente para para submeter formulários de ajustes de widgets.
 */
import React from 'react'
import { intlShape, FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ColorPicker,
  HelpBlock
} from 'components/forms'
import { SettingsForm } from 'ux/components'

const fieldsComponent = {
  'call_to_action': ({ intl, ...field }) => (
    <FormGroup controlId='call-to-action-id' {...field}>
      <ControlLabel>
        <FormattedMessage
          id='adjustments.form.call-to-action.label'
          defaultMessage='Título do formulário'
        />
      </ControlLabel>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'adjustments.form.call-to-action.placeholder',
          defaultMessage: 'Ex: Preencha o formulário abaixo para assinar a petição.'
        })}
      />
    </FormGroup>
  ),
  'button_text': ({ intl, ...field }) => (
    <FormGroup controlId='button-text-id' {...field}>
      <ControlLabel>
        <FormattedMessage
          id='adjustments.form.button-text.label'
          defaultMessage='Botão'
        />
      </ControlLabel>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'adjustments.form.button-text.placeholder',
          defaultMessage: 'Defina o texto do botão de confirmação do formulário.'
        })}
      />
    </FormGroup>
  ),
  'count_text': ({ intl, ...field }) => (
    <FormGroup controlId='count-text-id' {...field}>
      <ControlLabel>
        <FormattedMessage
          id='adjustments.form.count-text.label'
          defaultMessage='Contador'
        />
      </ControlLabel>
      <FormControl
        type='text'
        placeholder={intl.formatMessage({
          id: 'adjustments.form.count-text.placeholder',
          defaultMessage: 'Defina o texto que ficará ao lado do número de pessoas que agiram.'
        })}
      />
      <HelpBlock>
        <FormattedMessage
          id='adjustments.form.count-text.helpBlock'
          defaultMessage='O contador será mostrado se existir um texto definido.'
        />
      </HelpBlock>
    </FormGroup>
  ),
  'main_color': ({ intl, dispatch, colorScheme, ...field }) => (
    <FormGroup controlId='main-color-id' {...field}>
      <ControlLabel>
        <FormattedMessage
          id='adjustments.form.main-color.label'
          defaultMessage='Cor padrão'
        />
      </ControlLabel>
      <HelpBlock>
        <FormattedMessage
          id='adjustments.form.main-color.helpBlock'
          defaultMessage='Selecione a cor no box abaixo ou insira o valor em hex, por exemplo: #DC3DCE.'
        />
      </HelpBlock>
      <ColorPicker
        dispatch={dispatch}
        theme={colorScheme.replace('-scheme', '')}
      />
    </FormGroup>
  )
}

export const createAdjustmentsForm = (fieldList) => (props) => {
  const {
    children,
    widget,
    asyncWidgetUpdate,
    // TODO: Remover essa dependencia da mobilização
    dispatch,
    colorScheme,
    intl,
    ...formProps
  } = props

  return (
    <SettingsForm
      {...formProps}
      onSubmit={values => {
        const settings = widget.settings || {}

        return asyncWidgetUpdate({
          ...widget,
          settings: { ...settings, ...values }
        })
      }}
      successMessage={intl.formatMessage({
        id: 'adjustments.form.successMessage',
        defaultMessage: 'Formulário configurado com sucesso!'
      })}
    >
      {fieldList.filter(name => props.fields[name]).map((fieldName, indexFieldName) => {
        const FieldComponent = fieldsComponent[fieldName]
        const fieldProps = props.fields[fieldName]
        return (
          <FieldComponent
            key={indexFieldName}
            intl={intl}
            dispatch={dispatch}
            colorScheme={colorScheme}
            {...fieldProps}
          />
        )
      })}
      {children}
    </SettingsForm>
  )
}

export const AdjustmentsSettingsForm = createAdjustmentsForm([
  'call_to_action', 'button_text', 'count_text', 'main_color'
])

AdjustmentsSettingsForm.propTypes = {
  // Injected by redux-form
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // Injected by widgets/models/ModelForm
  colorScheme: PropTypes.string,
  // Injected by container
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  asyncWidgetUpdate: PropTypes.func.isRequired,
  // Injected by react-intl
  intl: intlShape.isRequired
}
