import React from 'react'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { expect } from 'chai'

import Page from './page'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

describe('routes/admin/authenticated/sidebar/templates-create/page', () => {
  let wrapper
  const props = {
    mobilization: { id: 1, name: '', goal: '' },
    fields: {
      name: {},
      goal: {}
    },
    handleSubmit: () => {},
    submitFailed: false,
    dirty: false,
    valid: false
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
