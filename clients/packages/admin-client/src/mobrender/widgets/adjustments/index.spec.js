import { expect } from 'chai'
import {
  adjustmentsForm,
  adjustmentsFormExtend,
  AdjustmentsSettingsForm
} from './'

describe('Adjustments API', () => {
  it('adjustmentsForm is function', () => {
    expect(typeof adjustmentsForm).to.be.equal('function')
  })

  it('adjustmentsFormExtend is function', () => {
    expect(typeof adjustmentsFormExtend).to.be.equal('function')
  })

  it('AdjustmentsSettingsForm is component', () => {
    expect(typeof AdjustmentsSettingsForm).to.be.equal('function')
  })
})
