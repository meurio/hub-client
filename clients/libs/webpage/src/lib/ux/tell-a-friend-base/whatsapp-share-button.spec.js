import * as React from 'react'
import test from 'ava'
import { shallow } from 'enzyme'

import WhatsAppShareButton from './whatsapp-share-button'

let wrapper
const props = {
  href: 'http://www.minhasampa.org.br',
  whatsappText: 'Foo Bar WhatsApp Text'
}

test.beforeEach(() => {
  wrapper = shallow(<WhatsAppShareButton {...props} />)
})

test('should render an <a /> tag element', t => {
  t.is(wrapper.find('a').length, 1)
})

test('should render an <a /> tag with its href properly', t => {
  const text = encodeURIComponent(props.whatsappText)
  t.is(wrapper.find('a').props().href, `https://api.whatsapp.com/send?text=${text}`)
})