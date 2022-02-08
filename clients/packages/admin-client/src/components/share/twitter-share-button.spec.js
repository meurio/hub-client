/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { TwitterShareButton } from './index'

global.window = {}

describe.skip('client/components/share/twitter-share-button', () => {
  it('should open a popup on click', () => {
    const wrapper = shallow(
      <TwitterShareButton href='http://meurio.org.br' text='Change the world!' />
    )

    const stubOpen = sinon.spy()
    window.open = stubOpen

    wrapper.find('button').at(0).simulate('click')
    const expectedText = encodeURIComponent('Change the world!')

    expect(stubOpen.calledWith(
      `https://twitter.com/intent/tweet?text=${expectedText}&url=http://meurio.org.br`,
      'Compartilhar no Twitter',
      'width=800,height=600'
    )).to.be.true
  })

  it('should render text that contains hashtag and at mention chars', () => {
    const wrapper = shallow(
      <TwitterShareButton href='http://meurio.org.br' text='Change the world! #foo @bar' />
    )

    const stubOpen = sinon.spy()
    window.open = stubOpen

    wrapper.find('button').at(0).simulate('click')
    const expectedText = encodeURIComponent('Change the world! #foo @bar')

    expect(stubOpen.calledWith(
      `https://twitter.com/intent/tweet?text=${expectedText}&url=http://meurio.org.br`,
      'Compartilhar no Twitter',
      'width=800,height=600'
    )).to.be.true
  })
})
