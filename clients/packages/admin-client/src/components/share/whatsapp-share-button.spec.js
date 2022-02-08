import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { WhatsAppShareButton } from './index'

describe('client/components/share/whatsapp-share-button', () => {
  let wrapper
  const props = {
    href: 'http://www.minhasampa.org.br',
    whatsappText: 'Foo Bar WhatsApp Text'
  }

  describe('#render', () => {
    beforeAll(() => {
      wrapper = shallow(<WhatsAppShareButton {...props} />)
    })

    it('should render an <a /> tag element', () => {
      expect(wrapper.find('a')).to.have.length(1)
    })
    it('should render an <a /> tag with its href properly', () => {
      const text = encodeURIComponent(props.whatsappText)
      expect(wrapper.find('a').props().href).to.be.equal(`whatsapp://send?text=${text}`)
    })
    it('should render className hide when desktop version', () => {
      expect(wrapper.find('a').props().className).to.contains('lg-hide')
    })
    it('should render without className hide when preview is true', () => {
      wrapper.setProps({ preview: true })
      expect(wrapper.find('a').props().className).to.not.contains('lg-hide')
      wrapper.setProps(props)
    })
  })
})
