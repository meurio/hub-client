import { expect } from 'chai'
import required, { message } from './required'

describe('required', () => {
  const values = { firstName: 'Ada', email: '', lastName: '' }

  it('should return errors with required field', () => {
    expect(required(['firstName', 'lastName', 'email'])(values)).to.deep.equal({
      lastName: message,
      email: message
    })
  })
})
