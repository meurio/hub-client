import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import DropdownMenu from './dropdown-menu'

let wrapper
const props = {
  text: 'Foo bar',
  buttonClassName: 'button-class'
}

describe('client/components/dropdown-menu/dropdown-menu', () => {
  beforeAll(() => {
    wrapper = shallow(
      <DropdownMenu {...props}>
        <p>foo</p>
        <p>bar</p>
      </DropdownMenu>
    )
  })

  describe('#constructor', () => {
    it('should set initial state', () => {
      expect(wrapper.state()).to.deep.equal({ open: false })
    })
  })

  describe('#handleClick', () => {
    it('should toggle open state', () => {
      wrapper.setState({ open: false })
      expect(wrapper.state()).to.deep.equal({ open: false })
      wrapper.find('button').at(0).simulate('click')
      expect(wrapper.state()).to.deep.equal({ open: true })
    })
  })

  describe('#handleOverlayClick', () => {
    it('should set open state to false', () => {
      wrapper.setState({ open: true })
      wrapper.find('div.overlay').at(0).simulate('click')
      expect(wrapper.state()).to.deep.equal({ open: false })
    })
  })

  describe('#renderIcon', () => {
    it('should not render when not passed icon', () => {
      expect(wrapper.find('.icon')).to.have.length(0)
    })

    it('should render when passed icon', () => {
      wrapper = shallow(
        <DropdownMenu {...props} icon='test-icon'>
          <p>foo</p>
          <p>bar</p>
        </DropdownMenu>
      )
      expect(wrapper.find('.icon').props().className).to.have.string('fa fa-test-icon')
    })
  })

  describe('#renderOverlay', () => {
    it('should not render when closed', () => {
      wrapper.setState({ open: false })
      expect(wrapper.find('.overlay')).to.have.length(0)
    })

    it('should render when open', () => {
      wrapper.setState({ open: true })
      expect(wrapper.find('.overlay')).to.have.length(1)
    })
  })

  describe('#renderChildren', () => {
    it('should render children', () => {
      expect(wrapper.find('p')).to.have.length(2)
    })
  })

  describe('#render', () => {
    it('should render button and bind click', () => {
      expect(wrapper.find('button').text().trim()).to.equal('Foo bar')
    })
  })
})
