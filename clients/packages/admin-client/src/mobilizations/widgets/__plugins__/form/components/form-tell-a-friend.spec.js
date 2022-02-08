/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { FormTellAFriend } from 'mobilizations/widgets/__plugins__/form/components'

describe('client/mobilizations/widgets/__plugins__/form/components/form-tell-a-friend', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {}
  }

  beforeAll(() => {
    wrapper = shallow(<FormTellAFriend {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
