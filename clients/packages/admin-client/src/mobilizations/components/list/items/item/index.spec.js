import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Item } from 'mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/item', () => {
  let wrapper
  let props

  describe('Item', () => {
    beforeAll(() => {
      props = {
        onClick: () => {}
      }
      wrapper = shallow(
        <Item {...props}>
          <span>Foo Bar</span>
        </Item>
      )
    })

    describe('#render', () => {
      it('should render one <span> children element', () => {
        expect(wrapper.find('span')).to.have.length(1)
      })
      it('should render one <span> children element with its content properly', () => {
        expect(wrapper.find('span').text()).to.be.equal('Foo Bar')
      })
    })
  })

  describe('Header', () => {
    beforeEach(() => {
      wrapper = shallow(<Item.Header {...props} />)
    })

    describe('#render', () => {
      it('should render root div.item-header', () => {
        expect(wrapper.find('div.item-header').length).to.equal(1)
      })
    })
  })
})
