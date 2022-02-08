import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { NavbarButton } from 'components/navigation/navbar'

let wrapper

const children = 'Hello world'
const className = 'class'
const targetId = 'targetId'
const scrollableId = 'scrollableId'

describe('client/components/navigation/navbar/navbar-button', () => {
  describe('#handleClick', () => {
    // TODO: in order to test this method we should find a way to mock jquery,
    // or remove this dependency
  })

  describe('#render', () => {
    beforeAll(() => {
      wrapper = shallow(
        <NavbarButton
          className={className}
          targetId={targetId}
          scrollableId={scrollableId}>
          {children}
        </NavbarButton>
      )
    })

    it('should render an anchor', () => {
      expect(wrapper.type()).to.be.eql('a')
    })

    it('should add an onClick event listener to the anchor', () => {
      expect(wrapper.props().onClick).to.be.a('function')
    })
  })
})
