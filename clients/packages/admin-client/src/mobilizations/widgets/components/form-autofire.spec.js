/* eslint-disable no-unused-expressions */
import React from 'react'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import { FormAutofire } from 'mobilizations/widgets/components'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

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
    wrapper = shallowWithIntl(<FormAutofire {...props} intl={intl} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
