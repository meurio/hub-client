//
// For reference see: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
//
import React from 'react'
import { IntlProvider } from 'react-intl'
import { shallow } from 'enzyme'
import pt from 'intl/locale-data/pt-BR'

const intlProvider = new IntlProvider({ locale: 'pt-BR', messages: pt }, {})
const { intl } = intlProvider.getChildContext()

const nodeWithIntlProp = node => React.cloneElement(node, { intl })
const shallowWithIntl = (node, { context } = {}) => shallow(
  nodeWithIntlProp(node),
  { context: Object.assign({}, context, { intl }) }
)

export default shallowWithIntl
