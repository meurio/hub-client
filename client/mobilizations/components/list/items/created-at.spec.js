import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { CreatedAt } from '~client/mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/created-at', () => {
  let wrapper
  const props = {}

  describe('CreatedAt', () => {
    beforeAll(() => {
      wrapper = shallow(<CreatedAt {...props} />)
    })

    describe('#render', () => {
      it('should render without crash', () => {
        expect(wrapper).to.be.ok
      })
    })
  })

  describe('Header', () => {
    beforeAll(() => {
      wrapper = shallow(<CreatedAt.Header {...props} />)
    })

    it('should render root div.created-at-header', () => {
      expect(wrapper.find('div.created-at-header')).to.have.length(1)
    })
  })
})
