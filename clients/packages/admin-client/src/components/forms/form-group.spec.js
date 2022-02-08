/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import * as mock from 'utils/mock'
import { FormGroup } from 'components/forms'

const Label = props => (<label />)

class ControlLabel extends Component {
  render () {
    const formGroup = this.context.$formGroup
    return <Label {...formGroup} />
  }
}
ControlLabel.contextTypes = {
  $formGroup: PropTypes.object.isRequired
}

describe('client/components/forms/form-group', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <FormGroup controlId='form-group-id'>
        <ControlLabel>Dummy</ControlLabel>
      </FormGroup>
    )
  })

  it('should render empty by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should passed controlId by context', () => {
    const label = wrapper.find('ControlLabel').find('Label')
    expect(label.props()).to.deep.equal({
      controlId: 'form-group-id',
      value: undefined,
      onChange: undefined,
      onBlur: undefined,
      error: undefined,
      layout: 'block',
      touched: undefined,
      valid: undefined,
      submitError: undefined
    })
  })

  it('should pass to context child props redux-form field', () => {
    wrapper.setProps({
      value: 'dummy',
      onChange: mock.noop,
      onBlur: mock.noop
    })
    const label = wrapper.find('ControlLabel').find('Label')
    expect(label.props().controlId).to.equal('form-group-id')
    expect(label.props().value).to.equal('dummy')
    expect(label.props().onChange).to.equal(mock.noop)
    expect(label.props().onBlur).to.equal(mock.noop)
  })

  it('should render with padding right if passed layout is inline', () => {
    wrapper.setProps({ layout: 'inline' })
    expect(wrapper.find('div').props().style).to.deep.equal({
      paddingRight: '1rem'
    })
  })
})
