/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from 'utils/mock'
// import EditorOld from '@/mobilizations/widgets/__plugins__/content/components/editor-old'

describe('client/mobilizations/widgets/__plugins__/content/components/editor-old', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {
      settings: {
        content: ''
      }
    },
    editable: true,
    onEdit: mock.noop,
    onCancelEdit: mock.noop,
    dispatch: mock.noop
  }

  beforeAll(() => {
    // wrapper = shallow(<EditorOld {...props} />)
  })

  describe('#render', () => {
    xit('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
