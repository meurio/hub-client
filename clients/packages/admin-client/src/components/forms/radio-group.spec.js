/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { RadioGroup } from 'components/forms'

const Radio = props => (
  <input type='radio' />
)

describe('client/components/forms/radio-group', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <RadioGroup>
        <Radio value='radio-group1' />
        <Radio value='radio-group2' />
      </RadioGroup>,
      { context: {} }
    )
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should pass value context like checked to children', () => {
    wrapper.setContext({
      $formGroup: { value: 'radio-group1' }
    })
    const components = wrapper.find('Radio')
    expect(components.at(0).props().checked).to.equal('radio-group1')
    expect(components.at(1).props().checked).to.equal('radio-group1')
  })

  it('should pass context values redux-form field to children', () => {
    const onChange = () => {}
    const onBlur = () => {}
    wrapper.setContext({
      $formGroup: {
        value: 'radio-group1',
        onChange: onChange,
        onBlur: onBlur
      }
    })
    const components = wrapper.find('Radio')
    expect(components.at(0).props().onChange).to.equal(onChange)
    expect(components.at(0).props().onBlur).to.equal(onBlur)
    expect(components.at(1).props().onChange).to.equal(onChange)
    expect(components.at(1).props().onBlur).to.equal(onBlur)
  })
})
