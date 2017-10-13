import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import { expect } from 'chai'

import Page from '~routes/admin/authenticated/sidebar/templates-create/page'

describe('routes/admin/authenticated/sidebar/templates-create/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    fields: {
      name: {},
      goal: {}
    }
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
