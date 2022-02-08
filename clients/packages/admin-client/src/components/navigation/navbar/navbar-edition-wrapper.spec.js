import React from 'react'
import { expect } from 'chai'

import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { NavbarEditionWrapper } from 'components/navigation/navbar/navbar-edition-wrapper'
import { IntlProvider } from 'react-intl';

const intlProvider = new IntlProvider({ locale: 'en' }, {});
const { intl } = intlProvider.getChildContext();

const block = {}
const mobilization = {}
const auth = {}
const dispatch = () => {}

describe('client/components/navigation/navbar/navbar-edition-wrapper', () => {
  const wrapper = shallowWithIntl(
    <NavbarEditionWrapper
      block={block}
      mobilization={mobilization}
      auth={auth}
      dispatch={dispatch}
      intl={intl}
      blockUpdate={Function}
    />
  )
  it('should render form when its in the edit mode', () => {
    wrapper.setState({ isEditing: true })
    expect(wrapper.find('NavbarForm')).to.have.length(1)
  })

  it('should render button when its not in the edit mode', () => {
    wrapper.setState({ isEditing: false })
    expect(wrapper.find('NavbarButton')).to.length(1)
  })
})
