import { isValidEmail } from 'utils/validation-helper'

const applyValidate = ({
  validate,
  message
}) => (fieldsOrField, customMessage) => (values, errorsCtx) => {
  let fields = fieldsOrField
  const errors = errorsCtx || {}
  if (typeof fieldsOrField === 'string') {
    fields = [fieldsOrField]
  }

  fields.map(fieldName => {
    if (validate(values[fieldName])) {
      errors[fieldName] = errors[fieldName] || customMessage || message
    }
  })
  return errors
}

export const required = applyValidate({
  validate: (value) => !value,
  message: {
    id: 'utils.validate.required',
    defaultMessage: 'Preenchimento obrigatório'
  }
})

export const validateEmail = applyValidate({
  validate: (value) => !isValidEmail(value),
  message: {
    id: 'utils.validate.email',
    defaultMessage: 'Informe um e-mail válido'
  }
})

export const validate = (validations) => (values) => {
  let errors = {}
  validations.map(fn => { errors = fn(values, errors) })
  return errors
}
