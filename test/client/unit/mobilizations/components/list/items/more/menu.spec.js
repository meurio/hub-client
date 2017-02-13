import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { MoreMenu } from '~mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/more/menu', () => {
  let wrapper
  const props = {}
  const context = { router: {} }

  beforeAll(() => {
    wrapper = shallow(<MoreMenu {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
