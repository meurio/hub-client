import React from 'react'
import { expect } from 'chai'

import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import * as mock from 'utils/mock'
import Page from './component'

describe('client/mobrender/widgets/donations/component', () => {
  let wrapper
  const props = {
    dispatch: mock.noop,
    mobilization: { color_scheme: 'meurio' },
    fields: {
      title_text: 'title_text',
      button_text: 'button_text',
      main_color: 'main_color',
      default_donation_value: 'default_donation_value',
      donation_value1: 'donation_value1',
      donation_value2: 'donation_value2',
      donation_value3: 'donation_value3',
      donation_value4: 'donation_value4',
      donation_value5: 'donation_value5',
      recurring_period: 'recurring_period',
      payment_methods: 'payment_methods',
      payment_type: 'payment_type'
    },
    handleSubmit: () => {},
    submitting: false,
    widget: {},
    asyncWidgetUpdate: () => {}
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
