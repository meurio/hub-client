/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Raise } from 'components/forms'

describe('client/components/forms/raise', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<Raise error='foo bar' />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should render span.red tag', () => {
      expect(wrapper.find('span.red')).to.have.length(1)
    })
    it('should render span.red tag with its text properly', () => {
      expect(wrapper.find('span.red').text()).to.be.equal(' - foo bar')
    })
  })
})
