import { CPF, CNPJ } from 'cpf_cnpj'
import { applyValidate } from './applyValidate'

export const message = {
  cnpj: {
    length: {
      id: 'createForm.validate.cnpj.length',
      defaultMessage: 'CNPJ deve conter 14 digitos'
    },
    invalid: {
      id: 'createForm.validate.cnpj.invalid',
      defaultMessage: 'CNPJ inválido'
    }
  },
  cpf: {
    length: {
      id: 'createForm.validate.cpf.length',
      defaultMessage: 'CPF deve conter 11 digitos'
    },
    invalid: {
      id: 'createForm.validate.cpf.invalid',
      defaultMessage: 'CPF inválido'
    }
  }
}

export default applyValidate({
  validate: (value) => {
    if (!value) return

    const { cpf, cnpj } = message
    const document = value.replace(/[^\d]/g, '')

    if (document.length > 11 && document.length !== 14) return cnpj.length
    else if (document.length < 11) return cpf.length
    else if (document.length === 11 && !CPF.isValid(document)) {
      return cpf.invalid
    } else if (document.length === 14 && !CNPJ.isValid(document)) {
      return cnpj.invalid
    }
  }
})
