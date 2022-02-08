/* eslint-disable no-unused-expressions */
// import React from 'react'
// import { shallow } from 'enzyme'
import { expect } from 'chai'

// import { TellAFriend } from './index'

describe('client/components/share/tell-a-friend', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    href: 'http://foo.bar',
    message: 'Foo Bar Message',
    mobilization: { twitter_share_text: 'Twitter Share Text' },
    widget: { settings: { whatsapp_text: 'Foo Bar' } }
  }

  beforeAll(() => {
    //wrapper = shallow(<TellAFriend {...props} />)
  })

  describe('#render', () => {
    xit('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
