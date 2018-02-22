import React from 'react'
import { expect } from 'chai'

import * as mock from '~client/utils/mock'
import { shallowWithIntl } from '~root/intl/helpers'
import { AdjustmentsSettingsForm as Page } from './component'

describe('client/mobrender/widgets/adjustments/component', () => {
  let wrapper
  const props = {
    colorScheme: '#c7c7c7',
    fields: {
      call_to_action: 'callToAction',
      button_text: 'buttonText',
      count_text: 'countText'
    },
    handleSubmit: mock.noop,
    submitting: false,
    error: undefined,
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop
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
