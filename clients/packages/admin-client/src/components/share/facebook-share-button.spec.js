/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { FacebookShareButton } from 'components/share'

global.window = {}

describe.skip('client/components/share/facebook-share-button', () => {
  it('should open a popup on click', () => {
    const wrapper = shallow(<FacebookShareButton href='http://meurio.org.br' />)

    const stubOpen = sinon.spy()
    global.window.open = stubOpen

    wrapper.find('button').at(0).simulate('click')

    expect(stubOpen.called).to.be.true
  })
})
