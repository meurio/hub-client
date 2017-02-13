import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { More } from '~mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/more/more', () => {
  let wrapper
  const props = {}

  beforeAll(() => {
    wrapper = shallow(<More {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
