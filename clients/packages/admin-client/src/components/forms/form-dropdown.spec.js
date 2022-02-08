/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { FormDropdown } from 'components/forms'

describe('client/components/forms/form-dropdown', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<FormDropdown />, { context: {} })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set id when $formGroup.controlId passed by context', () => {
    wrapper.setContext({
      $formGroup: {
        controlId: 'form-group-id'
      }
    })
    expect(wrapper.find('select').props().id).to.equal('form-group-id')
  })

  it('should set props field redux-form passed by context', () => {
    const onChange = () => {}
    const onBlur = () => {}
    wrapper.setContext({
      $formGroup: {
        value: 'Form Control',
        onChange: onChange,
        onBlur: onBlur
      }
    })
    expect(wrapper.find('select').props().value).to.equal('Form Control')
    expect(wrapper.find('select').props().onChange).to.equal(onChange)
    expect(wrapper.find('select').props().onBlur).to.equal(onBlur)
  })

  describe('with childrens', () => {
    it('should render with one <option> children', () => {
      wrapper = shallow(
        <FormDropdown>
          <option value='foo'>Foo</option>
        </FormDropdown>
      )
      expect(wrapper.find('option')).to.have.lengthOf(1)
    })
    it('should render with multiple <option> childrens', () => {
      wrapper = shallow(
        <FormDropdown>
          <option value='foo'>Foo</option>
          <option value='bar'>Bar</option>
          <option value='baz'>Baz</option>
        </FormDropdown>
      )
      expect(wrapper.find('option')).to.have.lengthOf(3)
    })
  })
})
