/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { WYSIHTMLToolbarCreateLink } from './wysihtml-toolbar-create-link'

describe('client/components/editor-wysihtml/wysihtml-toolbar-create-link', () => {
  const props = {
    setEditorLinkTargetType: jest.fn(),
    editorLinkTargetType: ''
  }

  it('should render without crash', () => {
    const wrapper = shallow(<WYSIHTMLToolbarCreateLink {...props} />)
    expect(wrapper).to.be.ok
  })
})
