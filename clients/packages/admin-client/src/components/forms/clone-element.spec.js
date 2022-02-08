import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import { cloneElement } from 'components/forms/clone-element'

describe('client/components/forms/clone-element', () => {
  it('should clone array children with props', () => {
    const props = { title: 'Lorem' }
    const strong = mount(<strong />)
    const button = mount(<button />)
    const children = cloneElement([strong, button], props)
    // assert
    expect(children[0].props).to.deep.equal(props)
    expect(children[1].props).to.deep.equal(props)
  })

  it('should clone element children with props', () => {
    const props = { title: 'Lorem' }
    const strong = mount(<strong />)
    const children = cloneElement(strong, props)
    expect(children.props).to.deep.equal(props)
  })
})
