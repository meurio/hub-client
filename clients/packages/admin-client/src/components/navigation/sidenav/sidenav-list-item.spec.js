/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SidenavListItem } from './index'

describe('client/components/navigation/sidenav/sidenav-list-item', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    href: ''
  }

  beforeAll(() => {
    wrapper = shallow(<SidenavListItem {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
