/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import WYSIHTMLToolbarInsertImage from './wysihtml-toolbar-insert-image';

describe('client/components/editor-wysihtml/wysihtml-toolbar-insert-image', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<WYSIHTMLToolbarInsertImage {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
