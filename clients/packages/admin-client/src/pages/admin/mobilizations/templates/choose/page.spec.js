import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from './page'

describe('routes/admin/authenticated/sidebar/templates-choose/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    templatesGlobalLength: 1,
    templatesCustomLength: 1
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
