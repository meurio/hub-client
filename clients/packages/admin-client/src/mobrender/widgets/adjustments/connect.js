/**
 * adjustmentsForm
 *
 *  Formulário padrão de ajustes
 *
 *  - call_to_action: título do formulário
 *  - button_text: nome do botão de ação
 *  - count_text: texto do contador
 *
 * adjustamentsFormExtend
 *
 *  Função que recebe como parametro fields, lista de strings usada para
 *  extender os campos do AdjustmentsForm
 */
import { ModelForm } from '../models'

const adjustFields = (fields) => {
  let adjusts = ['call_to_action', 'button_text', 'count_text', 'main_color']
  adjusts.push.apply(adjusts, fields || [])
  return adjusts
}

const validate = (values, { intl }) => {
  const errors = {}
  if (!values.call_to_action) {
    errors.call_to_action = intl.formatMessage({
      id: 'adjustmentnsForm.validate.call_to_action.required',
      defaultMessage: 'Insira o título da widget'
    })
  }
  if (!values.button_text) {
    errors.button_text = intl.formatMessage({
      id: 'adjustmentnsForm.validate.button_text.required',
      defaultMessage: 'Insira o texto do botão'
    })
  } else if (values.button_text.length > 50) {
    errors.button_text = intl.formatMessage({
      id: 'adjustmentnsForm.validate.button_text.length',
      defaultMessage: 'O limite de caracteres foi atingido.'
    })
  }
  return errors
}

export const adjustmentsFormExtend = ({ fields, formName, ...config }) => ModelForm({
  form: formName,
  fields: adjustFields(fields),
  ...config
})

export const adjustmentsForm = ({ formName }) => adjustmentsFormExtend({
  formName,
  mapInitialValues: (widget) => ({
    // Fix field to config title on widget
    call_to_action: widget.settings
      ? widget.settings.call_to_action ||
      widget.settings.title_text : ''
  }),
  validate
})
