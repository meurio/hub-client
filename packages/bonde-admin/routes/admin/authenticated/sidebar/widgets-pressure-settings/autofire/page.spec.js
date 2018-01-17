import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import Page from '~routes/admin/authenticated/sidebar/widgets-pressure-settings/autofire/page'

describe('routes/admin/authenticated/sidebar/widgets-pressure-settings/autofire/page', () => {
  let wrapper
  const props = {
    fields: {
      sender_name: {},
      sender_email: {},
      email_subject: {},
      email_text: {}
    },
    mobilization: { id: 1 },
    widget: { kind: 'pressure' },
    // Actions
    asyncWidgetUpdate: mock.noop
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
