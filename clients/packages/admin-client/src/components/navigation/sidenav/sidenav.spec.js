/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Sidenav } from './index'

describe('client/components/navigation/sidenav/sidenav', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    community: { image: '' }
  }

  beforeAll(() => {
    wrapper = shallow(<Sidenav {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
