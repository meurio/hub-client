import * as React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import TwitterShareButton from './twitter-share-button'
import { IntlProvider } from 'react-intl'

global.window = {}
const {intl} = new IntlProvider({ locale: "en" }, {}).getChildContext()

test('should open a popup on click', t => {
  const wrapper = shallow(
      <TwitterShareButton href='http://meurio.org.br' text='Change the world!' />, {
        context: { intl }
      }
  ).shallow()

  const stubOpen = sinon.spy()
  window.open = stubOpen

  wrapper.find('button').at(0).simulate('click')
  const expectedText = encodeURIComponent('Change the world!')

  t.true(stubOpen.calledWith(
    `https://twitter.com/intent/tweet?text=${expectedText}&url=http://meurio.org.br`,
    'Compartilhar no Twitter',
    'width=800,height=600'
  ))
})

test('should render text that contains hashtag and at mention chars', t => {
  const wrapper = shallow(
    <TwitterShareButton href='http://meurio.org.br' text='Change the world! #foo @bar' />, {
      context: { intl }
    }
  ).shallow()

  const stubOpen = sinon.spy()
  window.open = stubOpen

  wrapper.find('button').simulate('click')
  const expectedText = encodeURIComponent('Change the world! #foo @bar')

  const text = stubOpen.calledWith(
    `https://twitter.com/intent/tweet?text=${expectedText}&url=http://meurio.org.br`,
    'Compartilhar no Twitter',
    'width=800,height=600'
  )

  t.true(text)
})
