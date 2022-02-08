/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Input } from 'components/form-util'

describe('client/components/form-util/input', () => {
  let wrapper
  const props = {
    uid: 'foo',
    type: 'text',
    label: 'Foo Bar Label',
    placeholder: 'Foo Bar Placeholder'
  }

  beforeEach(() => {
    wrapper = shallow(<Input {...props} />)
  })

  it('should render input with expected id', () => {
    expect(wrapper.find('input').props().id).to.equal(`input-${props.uid}`)
  })

  it('should render input with expected type', () => {
    expect(wrapper.find('input').props().type).to.equal(props.type)
  })

  it('should render label with expected text', () => {
    expect(wrapper.find('label').text()).to.equal(props.label)
  })

  it('should render input with expected placeholder', () => {
    expect(wrapper.find('input').props().placeholder).to.equal(props.placeholder)
  })
})
