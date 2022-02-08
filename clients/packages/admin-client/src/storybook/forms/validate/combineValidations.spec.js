import { expect } from 'chai'
import { combineValidations } from './combineValidations'
import required, { message as requiredMessage } from './required'
import isEmail, { message as emailMessage } from './isEmail'

describe('combineValidations', () => {
  it('should keep validation message with order to be applied', () => {
    const values = { name: '', email: '' }

    const fnFirstRequired = combineValidations([
      required(['name', 'email']),
      isEmail(['email'])
    ])
    expect(fnFirstRequired(values)).to.deep.equal({
      name: requiredMessage,
      email: requiredMessage
    })

    const fnFirstEmail = combineValidations([
      isEmail(['email']),
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
    const fnValidate = combineValidations([
      required('firstName', firstNameMessage),
      required('lastName', lastNameMessage)
    ])
    expect(fnValidate(values)).to.deep.equal({
      firstName: firstNameMessage,
      lastName: lastNameMessage
    })
  })
})
