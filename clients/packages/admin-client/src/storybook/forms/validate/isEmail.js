import { isValidEmail } from 'utils/validation-helper'
import { applyValidate } from './applyValidate'

export const message = {
  id: 'createForm.validate.email',
  defaultMessage: 'Informe um e-mail válido'
}

export default applyValidate({
  validate: (value) => !isValidEmail(value),
  message
})
