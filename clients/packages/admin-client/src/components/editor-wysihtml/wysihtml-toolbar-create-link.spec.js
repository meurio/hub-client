/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import {
  WYSIHTMLToolbarCreateLink
} from 'components/editor-wysihtml/wysihtml-toolbar-create-link'

describe('client/components/editor-wysihtml/wysihtml-toolbar-create-link', () => {
  let wrapper
  const props = {
    dispatch: () => {},
    editorLinkTargetType: ''
  }

  beforeAll(() => {
    wrapper = shallow(<WYSIHTMLToolbarCreateLink {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
