import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Error } from 'components/form-util'

describe('client/components/form-util/error', () => {
  let wrapper
  const props = { message: 'Foo Bar Error Message!' }

  beforeEach(() => {
    wrapper = shallow(<Error {...props} />)
  })

  it('should render with expected message', () => {
    expect(wrapper.text()).to.equal(props.message)
  })

  it('should render with custom class names', () => {
    wrapper.setProps({ ...props, classes: ['foo', 'bar'] })
    expect(wrapper.props().className).to.have.string('foo')
    expect(wrapper.props().className).to.have.string('bar')
  })

  it('should render with default styles', () => {
    const backgroundColor = '#f9cace'
    const borderWidth = '8px'
    expect(wrapper.props().style).to.have.property('backgroundColor', backgroundColor)
    expect(wrapper.props().style).to.have.property('borderWidth', borderWidth)
  })

  it('should render overriding default styles by custom styles', () => {
    const backgroundColor = '#fff'
    const borderWidth = '2px'
    wrapper.setProps({ ...props, styles: { backgroundColor, borderWidth } })
    expect(wrapper.props().style).to.have.property('backgroundColor', backgroundColor)
    expect(wrapper.props().style).to.have.property('borderWidth', borderWidth)
  })

  it('should render with custom styles', () => {
    const borderColor = '#000'
    wrapper.setProps({ ...props, styles: { borderColor } })
    expect(wrapper.props().style).to.have.property('borderColor', borderColor)
  })
})
