import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import Page from './page'

describe('routes/admin/authenticated/sidebar/mobilizations-list/page', () => {
  let wrapper
  const props = {
    mobilizations: [{ id: 1, name: '', goal: '' }, { id: 2, name: '', goal: '' }],
    toggleMenu: () => {},
    select: mock.noop,
    menuActiveIndex: 1,
    location: {
      pathname: ''
    },
    dispatch: mock.noop
  }
  const context = { router: {} }

  beforeAll(() => {
    wrapper = shallow(<Page {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
