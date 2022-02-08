import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SidenavList } from './index'

describe('client/components/navigation/sidenav/sidenav-list', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <SidenavList>
        <h1>Foo Bar Children</h1>
      </SidenavList>
    )
  })

  it('should render root .items <div> element', () => {
    expect(wrapper.find('.items')).to.have.length(1)
  })

  describe('children', () => {
    it('should render the children <h1> element', () => {
      expect(wrapper.find('.items > h1')).to.have.length(1)
    })

    it('should render the children <h1> element with its content properly', () => {
      expect(wrapper.find('.items > h1').text()).to.be.equal('Foo Bar Children')
    })
  })

  describe('multiple childrens', () => {
    beforeEach(() => {
      wrapper = shallow(
        <SidenavList>
          <div>First Children</div>
          <div>Second Children</div>
        </SidenavList>
      )
    })

    it('should render two <div> children elements', () => {
      expect(wrapper.find('.items > div')).to.have.length(2)
    })

    it('should render first <div> children element with its content properly', () => {
      expect(wrapper.find('.items > div').at(0).text()).to.be.equal('First Children')
    })

    it('should render second <div> children element with its content properly', () => {
      expect(wrapper.find('.items > div').at(1).text()).to.be.equal('Second Children')
    })
  })

  describe('custom props', () => {
    it('should render with custom className prop properly ', () => {
      const customClassName = 'foo-bar'
      wrapper.setProps({ className: customClassName })
      expect(wrapper.props().className).to.have.string(customClassName)
    })

    it('should render with custom style prop properly ', () => {
      const customStyle = { position: 'absolute', bottom: '0' }
      wrapper.setProps({ style: customStyle })
      expect(wrapper.props().style).to.be.deep.equal(customStyle)
    })
  })
})
