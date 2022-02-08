import { expect } from 'chai'

import { required, validateEmail, validate } from './'

describe('validate', () => {
  const requiredMessage = {
    id: 'utils.validate.required',
    defaultMessage: 'Preenchimento obrigatório'
  }
  const emailMessage = {
    id: 'utils.validate.email',
    defaultMessage: 'Informe um e-mail válido'
  }
  it('should return errors with required field', () => {
    const values = { firstName: 'Ada', email: '', lastName: '' }
    expect(required(['firstName', 'lastName', 'email'])(values)).to.deep.equal({
      lastName: requiredMessage,
      email: requiredMessage
    })
  })

  it('should return errors with invalid email', () => {
    const values = {
      email: 'test@nossas.org',
      email1: '',
      email2: 'test@@nossas.org'
    }
    expect(validateEmail(['email', 'email1', 'email2'])(values)).to.deep.equal({
      email1: emailMessage,
      email2: emailMessage
    })
  })

  it('should keep validation message with order to be applied', () => {
    const values = { name: '', email: '' }

    const fnFirstRequired = validate([
      required(['name', 'email']),
      validateEmail(['email'])
    ])
    expect(fnFirstRequired(values)).to.deep.equal({
      name: requiredMessage,
      email: requiredMessage
    })

    const fnFirstEmail = validate([
      validateEmail(['email']),
      required(['name', 'email'])
    ])
    expect(fnFirstEmail(values)).to.deep.equal({
      name: requiredMessage,
      email: emailMessage
    })
  })

  it('should make a validation with custom message', () => {
    const firstNameMessage = {
      id: 'validation.required.firstName',
      defaultMessage: 'First name is required'
    }
    const lastNameMessage = {
      id: 'validation.required.lastName',
      defaultMessage: 'Last name is required'
    }
    const values = { firstName: '', lastName: '' }
    const fnValidate = validate([
      required('firstName', firstNameMessage),
      required('lastName', lastNameMessage)
    ])
    expect(fnValidate(values)).to.deep.equal({
      firstName: firstNameMessage,
      lastName: lastNameMessage
    })
  })
})
