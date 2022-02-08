import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import * as mock from 'utils/mock'

import Page from './page'

describe('routes/admin/authenticated/sidebar/templates-list/page', () => {
  let wrapper
  const props = {
    toggleMenu: mock.noop,
    menuActiveIndex: 0,
    mobilizationTemplates: [{ id: 1, name: '', goal: '' }, { id: 2, name: '', goal: '' }],
    asyncDestroyTemplate: mock.noop,
    asyncFetch: mock.noop,
    location: {
      pathname: ''
    }
  }

  beforeAll(() => {
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
