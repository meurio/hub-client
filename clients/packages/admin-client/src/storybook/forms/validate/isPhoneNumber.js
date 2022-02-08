import { isValidPhoneE164 } from 'utils/validation-helper'
import { applyValidate } from './applyValidate'

export const message = {
  id: 'createForm.validate.phoneNumber',
  defaultMessage: 'Formato de telefone inválido. Ex: +5511956781234'
}

export default applyValidate({
  validate: (value) => !isValidPhoneE164(value),
  message
})
