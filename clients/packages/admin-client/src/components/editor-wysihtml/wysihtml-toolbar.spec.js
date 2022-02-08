import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { WYSIHTMLToolbar } from 'components/editor-wysihtml'

describe('client/components/editor-wysihtml/wysihtml-toolbar', () => {
  let wrapper
  const props = {
    elementId: 'some-id',
    className: 'some-class'
  }

  beforeAll(() => {
    wrapper = shallow(<WYSIHTMLToolbar {...props} />)
  })

  describe('#render', () => {
    it('should set the element id', () => {
      expect(wrapper.props().id).to.be.eql('some-id')
    })
    it('should set the element classes', () => {
      expect(wrapper.props().className).to.have.string('some-class')
    })
  })
})
