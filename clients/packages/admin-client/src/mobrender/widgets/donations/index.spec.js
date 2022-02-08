import { expect } from 'chai'
import {
  donationForm,
  DonationSettingsForm
} from './'

describe('Donations API', () => {
  it('donationForm is function', () => {
    expect(typeof donationForm).to.be.equal('function')
  })

  it('DonationSettingsForm is component', () => {
    expect(typeof DonationSettingsForm).to.be.equal('function')
  })
})
