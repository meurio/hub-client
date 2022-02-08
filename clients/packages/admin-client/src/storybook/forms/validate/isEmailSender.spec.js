import { expect } from 'chai'
import isEmailSender, { message } from './isEmailSender'

describe('isEmailSender', () => {
  it('should return errors with invalid email', () => {
    const values = {
      email: 'Test <test@nossas.org>',
      email1: '',
      email2: 'Test test@nossas.org',
      email3: 'Test <test@nossas.org>',
      email4: 'Test <test@@nossas.org>',
      email5: 'test@nossas.org'
    }
    const fields = ['email', 'email1', 'email2', 'email3', 'email4', 'email5']
    expect(isEmailSender(fields)(values)).to.deep.equal({
      email1: message,
      email2: message,
      email4: message,
      email5: message
    })
  })
})
