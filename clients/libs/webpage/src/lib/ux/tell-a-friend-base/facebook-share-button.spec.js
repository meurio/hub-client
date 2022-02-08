import * as React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'
import FacebookShareButton from './facebook-share-button'
import { IntlProvider } from 'react-intl';
import { shallowWithIntl } from '../../helpers/intl-enzyme-test-helper';

global.window = {}

test('should open a popup on click', t => {
  const { intl } = new IntlProvider({ locale: "en" }, {}).getChildContext()
  const wrapper = shallow(
    <FacebookShareButton href='http://meurio.org.br' />, { context: { intl } }
  ).shallow()

  const stubOpen = sinon.spy()
  global.window.open = stubOpen

  wrapper.find('button').at(0).simulate('click')

  t.true(stubOpen.called)
})