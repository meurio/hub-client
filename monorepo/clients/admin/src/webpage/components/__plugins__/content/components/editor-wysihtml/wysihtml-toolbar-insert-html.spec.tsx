/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import WYSIHTMLToolbarInsertHTML from './wysihtml-toolbar-insert-html';

describe('client/components/editor-wysihtml/wysihtml-toolbar-insert-html', () => {
  it('should render without crash', () => {
    const wrapper = shallow(<WYSIHTMLToolbarInsertHTML />)
    expect(wrapper).to.be.ok
  })
})
