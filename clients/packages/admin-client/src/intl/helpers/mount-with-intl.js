//
// For reference see: https://github.com/yahoo/react-intl/wiki/Testing-with-React-Intl#enzyme
//
import React from 'react'
import { IntlProvider, intlShape } from 'react-intl'
import { mount } from 'enzyme'
import pt from 'intl/locale-data/pt-BR'

const intlProvider = new IntlProvider({ locale: 'pt-BR', messages: pt }, {})
const { intl } = intlProvider.getChildContext()

const nodeWithIntlProp = node => React.cloneElement(node, { intl })
const mountWithIntl = (node, { context, childContextTypes } = {}) => mount(
  nodeWithIntlProp(node), {
    context: Object.assign({}, context, { intl }),
    childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes)
  }
)

export default mountWithIntl
