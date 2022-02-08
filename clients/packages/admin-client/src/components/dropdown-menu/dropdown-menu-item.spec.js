/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import DropdownMenuItem from './dropdown-menu-item'

let component
let clickString
let sandbox = sinon.sandbox.create()

const onClick = () => { clickString = clickString + 'bar' }
const onItemClick = () => { clickString = 'foo' }
const props = {
  disabled: false,
  onClick: onClick,
  onItemClick: onItemClick
}

describe('client/components/dropdown-menu/dropdown-menu-item', () => {
  describe('#handleClick', () => {
    beforeEach(() => {
      clickString = null
    })

    it('should call both onItemClick and onClick when not disabled', () => {
      component = shallow(<DropdownMenuItem {...props} />)
      component.simulate('click')
      expect(clickString).to.be.equal('foobar')
    })

    it('should not call onItemClick or onClick when disabled', () => {
      component = shallow(<DropdownMenuItem {...props} disabled />)
      component.simulate('click')
      expect(clickString).to.be.null
    })
  })

  describe('#render', () => {
    it.skip('should render enabled and bind onClick event', () => {
      const handleClick = sandbox.spy()
      component = shallow(<DropdownMenuItem {...props} onClick={handleClick} />)
      component.simulate('click')

      expect(component.find('a').at(0).props().disabled).to.be.false
      expect(handleClick).to.have.been.calledOnce
    })

    it('should render disabled', () => {
      component = shallow(<DropdownMenuItem {...props} disabled />)
      expect(component.find('a').at(0).props().disabled).to.be.true
    })
  })
})
