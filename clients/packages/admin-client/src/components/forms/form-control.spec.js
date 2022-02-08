/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'

import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import * as mock from 'utils/mock'
import { FormControl } from 'components/forms'

describe('client/components/forms/form-control', () => {
  let wrapper
  const context = {
    $formRedux: { formInline: false, submitting: false, dirty: false },
    $formGroup: { controlId: 'form-group-id' }
  }
  const props = {
    value: 'foo',
    onChange: mock.noop
  }

  beforeEach(() => {
    wrapper = shallowWithIntl(<FormControl {...props} />, { context })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set id when $formGroup.controlId passed by context', () => {
    expect(wrapper.find('input').props().id).to.equal('form-group-id')
  })

  it('should set props field redux-form passed by context', () => {
    const cloneContext = context
    const formGroupContext = {
      $formGroup: {
        value: 'Form Control',
        onChange: mock.noop,
        onBlur: mock.noop
      }
    }
    wrapper.setContext(Object.assign(cloneContext, formGroupContext))
    expect(wrapper.find('input').props().value).to.equal('Form Control')
    expect(wrapper.find('input').props().onChange).to.equal(mock.noop)
    expect(wrapper.find('input').props().onBlur).to.equal(mock.noop)
  })

  it('should render element with passed rows props when componentClass is textarea', () => {
    wrapper.setProps({ componentClass: 'textarea', rows: '4' })
    expect(wrapper.find('textarea').props().rows).to.equal('4')
  })

  describe('when it is form inline style', () => {
    beforeAll(() => {
      const cloneContext = context
      const formReduxContext = { $formRedux: { formInline: true } }
      wrapper.setContext(Object.assign(cloneContext, formReduxContext))
    })
    it('should render <ControlButtons> component', () => {
      expect(wrapper.find('InjectIntl(ControlButtons)')).to.have.length(1)
    })
    it('should render input with form inline style specific className', () => {
      expect(wrapper.find('.form-control-input').props().className).to.have.string('inline-block')
    })
  })
})
