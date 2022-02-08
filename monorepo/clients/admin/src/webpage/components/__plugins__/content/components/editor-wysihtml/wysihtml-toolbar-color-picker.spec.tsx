/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import WYSIHTMLToolbarColorPicker from './wysihtml-toolbar-color-picker';

describe('client/components/editor-wysihtml/wysihtml-toolbar-color-picker', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<WYSIHTMLToolbarColorPicker {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
