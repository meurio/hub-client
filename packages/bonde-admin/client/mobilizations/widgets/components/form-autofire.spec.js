/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallowWithIntl } from '~root/intl/helpers'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import { FormAutofire } from '~client/mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/form-autofire', () => {
  let wrapper
  const props = {
    fields: {
      sender_name: {},
      sender_email: {},
      email_subject: {},
      email_text: {}
    },
    mobilization: { id: 1 },
    widget: { kind: 'donation' },
    // Actions
    asyncWidgetUpdate: mock.noop
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<FormAutofire {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
