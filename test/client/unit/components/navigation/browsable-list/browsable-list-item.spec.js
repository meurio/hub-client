import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { BrowsableListItem } from '~components/navigation/browsable-list'

describe('client/components/navigation/browsable-list/browsable-list-item', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<BrowsableListItem {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
