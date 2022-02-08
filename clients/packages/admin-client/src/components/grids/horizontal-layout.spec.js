/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { HorizontalLayout } from 'components/grids'

const Dummy = props => (
  <span>Dummy</span>
)

describe('client/components/grids/horizontal-layout', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <HorizontalLayout>
        <Dummy />
        <Dummy />
      </HorizontalLayout>
    )
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should passed className with col css and layout inline', () => {
    wrapper.setProps({ cols: 5 })
    const expected = { layout: 'inline', 'className': 'sm-col sm-col-2' }
    const dummy1 = wrapper.find('Dummy').at(0)
    expect(dummy1.props()).to.deep.equal(expected)
    const dummy2 = wrapper.find('Dummy').at(1)
    expect(dummy2.props()).to.deep.equal(expected)
  })
})
