import { expect } from 'chai'
import * as paths from 'paths'

describe('client/mobilizations/widgets/__plugins__/donation/paths', () => {
  describe('#donation', () => {
    it('should return the donation path with params properly', () => {
      expect(paths.donation(1, 2)).to.equal('/mobilizations/1/widgets/2/donation')
    })
  })
  describe('#donationFinish', () => {
    it('should return the donation finish path with params properly', () => {
      expect(paths.donationFinish(1, 2)).to.equal('/mobilizations/1/widgets/2/donation/finish')
    })
  })
})
