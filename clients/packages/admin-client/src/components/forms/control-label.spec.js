/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { ControlLabel } from 'components/forms'

describe('client/components/forms/control-label', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(<ControlLabel>label</ControlLabel>, { context: {} })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })
  it('should set htmlFor when $formGroup.controlId passed by context', () => {
    const $formGroup = { controlId: 'form-group-id' }
    wrapper.setContext({ $formGroup })
    expect(wrapper.find('label').props().htmlFor).to.equal('form-group-id')
  })
  it('should render text children', () => {
    expect(wrapper.find('label').text()).to.equal('label')
  })
  it('should not render <Raise /> when it has error and not touched passed via $formGroup', () => {
    const $formGroup = { error: 'Foo Bar Error!', touched: false }
    wrapper.setContext({ $formGroup })
    expect(wrapper.find('Raise')).to.have.length(0)
  })
  it('should render <Raise /> when it has error and touched passed via $formGroup', () => {
    const $formGroup = { error: 'Foo Bar Error!', touched: true }
    wrapper.setContext({ $formGroup })
    expect(wrapper.find('Raise')).to.have.length(1)
  })
  it('should render <InputCounter /> if maxLength passed', () => {
    const $formGroup = { value: 'xunda', touched: true }
    wrapper.setContext({ $formGroup })
    wrapper.setProps({ maxLength: 100 })
    expect(wrapper.find('InputCounter')).to.have.length(1)
  })
})
