import { expect } from 'chai'
import isEmail, { message } from './isEmail'

describe('isEmail', () => {
  it('should return errors with invalid email', () => {
    const values = {
      email: 'test@nossas.org',
      email1: '',
      email2: 'test@@nossas.org'
    }
    expect(isEmail(['email', 'email1', 'email2'])(values)).to.deep.equal({
      email1: message,
      email2: message
    })
  })
})
