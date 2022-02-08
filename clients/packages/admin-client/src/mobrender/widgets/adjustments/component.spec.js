import React from 'react'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { AdjustmentsSettingsForm as Page } from './component'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

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
    wrapper = shallowWithIntl(<Page {...props} intl={intl} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok
    })
  })
})
