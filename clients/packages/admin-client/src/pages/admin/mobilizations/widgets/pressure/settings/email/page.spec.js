import React from 'react'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import Page from './page'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('routes/admin/authenticated/sidebar/widgets-pressure-settings/email/page', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop,
    fields: {},
    handleSubmit: mock.noop,
    submitting: false
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
