/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { FormRedux } from 'components/forms'

describe('client/components/forms/form-redux', () => {
  let wrapper
  const props = {
    onSubmit: (values, dispatch) => {},
    handleSubmit: (values, dispatch) => {},
    submitting: false,
    submitFailed: false,
    dirty: false,
    valid: false
  }

  beforeEach(() => {
    wrapper = shallow(<FormRedux {...props} />)
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should change state submitted when finish submit success', () => {
    wrapper.setProps({ submitting: true })
    wrapper.setProps({ submitting: false, submitFailed: false })
    expect(wrapper.instance().state.submitted).to.equal(true)
  })

  it('should pass onCancel for <ControlButtons />', () => {
    const onCancel = () => {}
    wrapper.setProps({ onCancel })
    expect(wrapper.find('InjectIntl(ControlButtons)').props().onCancel).to.equal(onCancel)
  })

  describe('default', () => {
    it('className prop should be as default', () => {
      expect(wrapper.props().className).to.be.a.string
    })
  })

  describe('when pass className prop', () => {
    const className = 'foo bar'
    const cloneProps = props
    const customProps = { className }
    beforeAll(() => {
      wrapper = shallow(<FormRedux {...Object.assign(cloneProps, customProps)} />)
    })
  })
})
