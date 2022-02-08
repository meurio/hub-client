/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SelectableList } from 'components/selectable-list'

describe('client/components/selectable-list/index', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    list: [{ id: 1, name: '', goal:  ''}]
  }

  beforeAll(() => {
    wrapper = shallow(<SelectableList
      {...props}
      setSelectedIndex={Function}
    />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
