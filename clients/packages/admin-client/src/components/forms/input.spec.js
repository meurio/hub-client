/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { Input } from 'components/forms'

describe('client/components/forms/input', () => {
  let field
  const formReduxProps = {
    input: {
      name: 'first_name',
      onChange: () => {},
      value: ''
    },
    meta: {}
  }

  beforeEach(() => {
    field = mount(<Input {...formReduxProps} />)
  })

  it('should render without crashed', () => {
    expect(field).to.be.ok
  })

  it('should not render label by default', () => {
    expect(field.find('label').length).to.equal(0)
  })

  it('should render label', () => {
    field.setProps({ label: 'Lorem' })
    expect(field.find('label').length).to.equal(1)
  })

  it('should render input with input props', () => {
    const inputProps = formReduxProps.input
    field.setProps({ input: inputProps })
    // ugly code, assert deep isn't work
    expect(field.find('input').props().name).to.equal(inputProps.name)
    expect(field.find('input').props().onChange).to.equal(inputProps.onChange)
    expect(field.find('input').props().value).to.equal(inputProps.value)
  })

  it('should render input with type', () => {
    const typeProp = 'text'
    field.setProps({ type: typeProp })
    expect(field.find('input').props().type).to.equal(typeProp)
  })

  it('should not render error when touched input only', () => {
    field.setProps({
      meta: {
        touched: true,
        error: undefined,
        warning: undefined
      }
    })
    expect(field.find('span').length).to.equal(0)
  })

  it('should render error when exists error and touched input', () => {
    field.setProps({
      meta: {
        touched: true,
        error: 'Invalid input'
      }
    })
    expect(field.find('span').length).to.equal(1)
  })

  it('should render warning when not exists error and touched input', () => {
    field.setProps({
      meta: {
        touched: true,
        error: undefined,
        warning: 'Invalid input'
      }
    })
    expect(field.find('span').length).to.equal(1)
  })

  it('should render placeholder', () => {
    field.setProps({ placeholder: 'Lorem' })
    expect(field.find('input').props().placeholder).to.equal('Lorem')
  })
})
