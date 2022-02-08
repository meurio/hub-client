/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
// import { FinishPostDonation } from 'bonde-webpage'
import { FinishPostDonationComponent } from './index'

describe('client/components/share/finish-post-donation', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    widget: { kind: 'donation' }
  }

  beforeAll(() => {
    wrapper = shallow(<FinishPostDonationComponent {...props} />)
  })

  describe('#render', () => {
    xit('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
