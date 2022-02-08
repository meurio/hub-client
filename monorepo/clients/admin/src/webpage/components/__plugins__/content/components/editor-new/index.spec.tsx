/* eslint-disable no-unused-expressions */
import { shallow } from 'enzyme'
import { expect } from 'chai'

import EditorNew from '.'

describe('client/mobilizations/widgets/__plugins__/content/components/editor-new', () => {
  let wrapper
  const props: any = {
    mobilization: {},
    widget: {
      settings: {
        content: ''
      }
    },
    editable: true,
    onEdit: jest.fn(),
    onCancelEdit: jest.fn(),
    dispatch: jest.fn()
  }

  beforeAll(() => {
    wrapper = shallow(<EditorNew {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
