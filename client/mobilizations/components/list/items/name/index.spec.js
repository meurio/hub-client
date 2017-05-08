import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Name } from '~client/mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/name', () => {
  let wrapper
  let props

  describe('Name', () => {
    beforeAll(() => {
      props = {}
      wrapper = shallow(<Name {...props} />)
    })

    describe('#render', () => {
      it('should render without crash', () => {
        expect(wrapper).to.be.ok
      })
    })
  })

  describe('Header', () => {
    beforeAll(() => {
      props = {}
      wrapper = shallow(<Name.Header {...props} />)
    })

    it('should render root div.name-header', () => {
      expect(wrapper.find('div.name-header')).to.have.length(1)
    })
  })
})
