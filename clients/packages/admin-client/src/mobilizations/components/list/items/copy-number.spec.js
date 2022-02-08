/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { CopyNumber } from 'mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/copy-number', () => {
  let wrapper
  const props = {}

  describe('CopyNumber', () => {
    beforeAll(() => {
      wrapper = shallow(<CopyNumber {...props} />)
    })

    describe('#render', () => {
      it('should render without crash', () => {
        expect(wrapper).to.be.ok
      })
    })
  })

  describe('Header', () => {
    beforeAll(() => {
      wrapper = shallow(<CopyNumber.Header {...props} />)
    })

    it('should render root div.copy-number-header', () => {
      expect(wrapper.find('div.copy-number-header')).to.have.length(1)
    })
  })
})
