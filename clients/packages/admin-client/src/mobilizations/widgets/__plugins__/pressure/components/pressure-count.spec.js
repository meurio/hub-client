import React from 'react'
import { expect } from 'chai'
import { mountWithIntl } from 'intl/helpers'
import { PressureCount } from 'mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/pressure-count', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mountWithIntl(<PressureCount />)
  })

  it('should render ok and total 0 by default', () => {
    const totalSpan = wrapper.find('span').at(0)
    expect(totalSpan.text()).to.equal('0')
  })

  it('should paint number with color', () => {
    wrapper.setProps({ color: '#444' })
    const totalSpan = wrapper.find('.h1').at(0)
    expect(totalSpan.props().style.color).to.equal('#444')
  })

  it('should render CountUp with `end` prop init with 0 if counting not started', () => {
    wrapper.setProps({ value: 420 })
    const totalSpan = wrapper.find('CountUp').at(0)
    expect(totalSpan.props().end).to.equal(0)
  })

  it('should render CountUp with `end` prop with passed value if counting already started', () => {
    const value = 420
    wrapper.setProps({ startCounting: true, value })
    const totalSpan = wrapper.find('CountUp').at(0)
    expect(totalSpan.props().end).to.equal(value)
  })

  it('should render text default pressões feitas', () => {
    wrapper.setProps({ text: undefined })
    expect(wrapper.find('span.bold').text()).to.equal('pressões feitas')
  })

  it('should render text passed', () => {
    wrapper.setProps({ text: 'pressões' })
    expect(wrapper.find('span.bold').text()).to.equal('pressões')
  })
})
