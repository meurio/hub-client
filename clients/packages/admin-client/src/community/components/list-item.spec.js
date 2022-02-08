/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import ListItem from 'community/components/list-item'

describe('client/community/components/list-item', () => {
  let wrapper
  const props = {
    onClick: mock.noop,
    community: { id: 1, name: 'foo', image: 'bar.png' }
  }

  beforeAll(() => {
    wrapper = shallow(<ListItem {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
