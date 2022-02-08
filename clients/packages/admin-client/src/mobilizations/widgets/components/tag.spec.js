import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

// Current module dependencies
import { Tag } from 'mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/tag', () => {
  let component
  const props = {
    value: 'Igor Santos <igor@nossascidades.org>'
  }

  beforeEach(() => {
    component = mount(<Tag {...props} />)
  })

  it('should render value by default with UI static', () => {
    const span = component.find('span').at(1)
    expect(span.props().className).to.equal(null)
    expect(span.props().onClick).to.equal(null)
    expect(component.find('i').length).to.equal(0)
  })

  it('should render close icon clicable when onRemove passed', () => {
    let removed
    component.setProps({
      onRemove: value => { removed = value }
    })
    component.find('i').simulate('click')
    expect(removed).to.equal(props.value)
  })

  it('should clickable when onClick passed', () => {
    let clicked
    component.setProps({
      onClick: value => { clicked = value }
    })
    component.find('span').at(1).simulate('click')
    expect(clicked).to.equal(props.value)
  })
})
