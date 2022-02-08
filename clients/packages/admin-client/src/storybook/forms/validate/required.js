import { applyValidate } from './applyValidate'

export const message = {
  id: 'createForm.validate.required',
  defaultMessage: 'Preenchimento obrigatório'
}

export default applyValidate({
  validate: (value) => !value,
  message
})
