/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { Radio } from 'components/forms'

describe('client/components/forms/radio', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Radio />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should mount id with `$radio-{value}-id` passed to set label and input', () => {
    wrapper.setProps({ value: 'dummy' })
    expect(wrapper.find('label').props().htmlFor).to.equal('radio-dummy-id')
    const input = wrapper.find('label').find('input')
    expect(input.props().id).to.equal('radio-dummy-id')
  })

  it('should mark checked is true when props.checked equals props.value', () => {
    wrapper.setProps({ value: 'dummy', checked: 'dummy' })
    expect(wrapper.find('label').find('input').props().checked).to.equal(true)
  })

  it('should add class pr2 if alignment is horizontal', () => {
    wrapper.setProps({ alignment: 'horizontal' })
    expect(wrapper.find('label').props().className).to.contain('pr2')
  })

  it('should add class block if alignment is vertical', () => {
    wrapper.setProps({ alignment: 'vertical' })
    expect(wrapper.find('label').props().className).to.contain('block')
  })
})
