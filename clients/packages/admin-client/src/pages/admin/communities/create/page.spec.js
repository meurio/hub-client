import React from 'react'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'

import * as mock from 'utils/mock'
import Page from './page'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('routes/admin/authenticated/external/community-new/page', () => {
  const props = {
    fields: {
      name: {},
      city: {}
    },
    submitting: false,
    // Actions
    create: mock.noop,
    asyncCreate: () => {},
    handleSubmit: () => {},
    submitFailed: false,
    dirty: false,
    valid: false
  }

  it('should render without crashed', () => {
    shallowWithIntl(<Page {...props} intl={intl} />)
  })
})
