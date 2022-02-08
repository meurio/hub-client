import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

import DivFloat from 'ux/components/div-float'

describe('client/ux/components/div-float', () => {
  let floatLayout

  beforeEach(() => {
    floatLayout = mount(<DivFloat />)
  })

  it('should render children', () => {
    const floatLayout = mount(<DivFloat><a href='http://localhost' /></DivFloat>)
    expect(floatLayout.find('a').length).to.equal(1)
  })

  it('should render by default top and right position', () => {
    expect(floatLayout.props().horizontal).to.equal('right')
    expect(floatLayout.props().vertical).to.equal('top')
  })

  it('should change className when change horizontal props', () => {
    floatLayout.setProps({ horizontal: 'left' })
    expect(floatLayout.find('div').props().className).to.contains('left')
  })

  it('should change className when change vertical props', () => {
    floatLayout.setProps({ vertical: 'bottom' })
    expect(floatLayout.find('div').props().className).to.contains('bottom')
  })
})
