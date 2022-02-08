import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from './page'

describe('routes/admin/authenticated/sidebar/mobilizations-settings-domain/page', () => {
  let wrapper
  const props = {
    mobilization: {
      id: 1,
      slug: 'foo-bar.org'
    },
    fields: { custom_domain: 'http://foo.bar' }
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
