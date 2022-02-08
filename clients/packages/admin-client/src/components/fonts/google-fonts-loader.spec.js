import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { GoogleFontsLoader } from 'components/fonts'

describe('client/components/fonts/google-fonts-loader', () => {
  const googleWebFonts = ['Armata', 'Ubuntu', 'Open Sans']
  const localFonts = ['PF Din', 'Proxima Nova']

  describe('#render', () => {
    it('should render a link tag when passed Google Web Fonts font', () => {
      const wrapper = shallow(<GoogleFontsLoader fonts={googleWebFonts} />)
      expect(wrapper.find('link')).to.have.length(1)
    })
    it('should render a link tag with font name in href when passed Google Web Fonts font', () => {
      const wrapper = shallow(<GoogleFontsLoader fonts={googleWebFonts} />)
      expect(wrapper.find('link').props().href).to.have.string('Armata')
      expect(wrapper.find('link').props().href).to.have.string('Ubuntu')
      expect(wrapper.find('link').props().href).to.have.string('Open+Sans')
    })
    it('should render a link tag when passed Google Web Fonts font and local fonts', () => {
      const wrapper = shallow(<GoogleFontsLoader fonts={googleWebFonts.concat(localFonts)} />)
      expect(wrapper.find('link')).to.have.length(1)
    })
    it('should render a link tag without local font names when passed Google Web Fonts font and' +
      ' local fonts', () => {
      const wrapper = shallow(<GoogleFontsLoader fonts={googleWebFonts.concat(localFonts)} />)
      expect(wrapper.find('link').props().href).to.not.have.string('PF+Din')
      expect(wrapper.find('link').props().href).to.not.have.string('PF Din')
      expect(wrapper.find('link').props().href).to.not.have.string('Proxima+Nova')
      expect(wrapper.find('link').props().href).to.not.have.string('Proxima Nova')
    })
    it('should not render a link tag when passed only local fonts', () => {
      const wrapper = shallow(<GoogleFontsLoader fonts={localFonts} />)
      expect(wrapper.find('link')).to.have.length(0)
    })
    it('should not render a no-script tag when passed only local fonts', () => {
      const wrapper = shallow(<GoogleFontsLoader fonts={localFonts} />)
      expect(wrapper.find('no-script')).to.have.length(1)
    })
  })
})
