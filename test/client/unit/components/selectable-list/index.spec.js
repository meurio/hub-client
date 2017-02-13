import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SelectableList } from '~components/selectable-list'

describe('client/components/selectable-list/index', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    list: [{ id: 1 }]
  }

  beforeAll(() => {
    wrapper = shallow(<SelectableList {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
