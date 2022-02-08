import { expect } from 'chai'
import { adjustmentsForm } from './connect'

describe('adjustmentsForm', () => {
  it('should be a ModelForm function', () => {
    expect(typeof adjustmentsForm).to.be.equal('function')
  })
})
