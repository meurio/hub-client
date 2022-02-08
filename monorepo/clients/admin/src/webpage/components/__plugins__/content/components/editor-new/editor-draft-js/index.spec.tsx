/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import EditorDraftJS from './index'

describe('client/components/editor-draft-js/index', () => {
  let wrapper
  const props = {
    handleSave: jest.fn(),
    readOnly: false,
    value: 'Foo bar',
    theme: 'theme',
    handleDelete: jest.fn()
  }

  beforeAll(() => {
    wrapper = shallow(<EditorDraftJS {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
