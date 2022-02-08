/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Users } from 'mobilizations/components/list/items'

describe('client/mobilizations/components/list/items/users', () => {
  let wrapper
  const props = {}

  describe('Users', () => {
    beforeAll(() => {
      wrapper = shallow(<Users {...props} />)
    })

    describe('#render', () => {
      it('should render without crash', () => {
        expect(wrapper).to.be.ok
      })
    })
  })

  describe('Header', () => {
    beforeAll(() => {
      wrapper = shallow(<Users.Header {...props} />)
    })

    it('should render root div.users-header', () => {
      expect(wrapper.find('div.users-header')).to.have.length(1)
    })
  })
})
