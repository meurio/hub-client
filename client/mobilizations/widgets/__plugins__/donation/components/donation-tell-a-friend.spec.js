import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { DonationTellAFriend } from '~client/mobilizations/widgets/__plugins__/donation/components'

describe('client/mobilizations/widgets/__plugins__/donation/components/donation-tell-a-friend',
  () => {
    let wrapper
    const props = {
      mobilization: {}
    }

    beforeAll(() => {
      wrapper = shallow(<DonationTellAFriend {...props} />)
    })

    describe('#render', () => {
      it('should render without crash', () => {
        expect(wrapper).to.be.ok
      })
    })
  }
)
