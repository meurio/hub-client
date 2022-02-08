import * as React from 'react'
import { shallow } from 'enzyme'
import test from 'ava'

import TellAFriend from './index'

let wrapper
const props = {
  dispatch: () => {},
  href: 'http://foo.bar',
  message: 'Foo Bar Message',
  mobilization: { twitter_share_text: 'Twitter Share Text' },
  widget: { settings: { whatsapp_text: 'Foo Bar' } }
}

test.beforeEach(() => {
  wrapper = shallow(<TellAFriend {...props} />)
})

test('should render without crash', t => {
  t.is(wrapper.length, 1)
})
