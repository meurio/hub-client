/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { FloatLayout } from 'components/grids'

describe('client/components/grids/float-layout', () => {
  let wrapper
  const text = 'foo bar'

  beforeAll(() => {
    wrapper = shallow(<FloatLayout>{text}</FloatLayout>)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should render with text properly', () => {
      expect(wrapper.text()).to.be.equal(text)
    })
    it('should render with floatTopRight className properly', () => {
      const position = 'floatTopRight'
      wrapper.setProps({ position })
      expect(wrapper.props().className).to.be.equal(position)
    })
    it('should render with floatTopLeft className properly', () => {
      const position = 'floatTopLeft'
      wrapper.setProps({ position })
      expect(wrapper.props().className).to.be.equal(position)
    })
  })
})
