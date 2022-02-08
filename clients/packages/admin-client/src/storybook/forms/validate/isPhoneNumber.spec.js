import { expect } from 'chai'
import isPhoneNumber, { message } from './isPhoneNumber'

describe('isPhoneNumber', () => {
  it('should return errors with invalid phone number', () => {
    const values = {
      phone: '+5531998877878', // successfully
      phone1: '+553199987787', // successfully, but without the first digit (9)
      phone2: '31999887878' // fail, wihtout area code
    }
    expect(isPhoneNumber(['phone', 'phone1', 'phone2'])(values)).to.deep.equal({
      phone2: message
    })
  })
})
