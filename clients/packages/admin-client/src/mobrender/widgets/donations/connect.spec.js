import { expect } from 'chai'
import { donationForm } from './connect'

describe('donationForm', () => {
  it('should be a adjustmentsFormExtend function', () => {
    expect(typeof donationForm).to.be.equal('function')
  })
})
