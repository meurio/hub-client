/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { FinishMessageCustom } from 'mobilizations/widgets/components'

describe('client/mobilizations/widgets/components/finish-message-custom', () => {
  let wrapper
  const props = {
    widget: {
      settings: {
        finish_message: 'finish_message',
        finish_message_background: 'finish_message_background'
      }
    },
    readOnly: true
  }

  beforeAll(() => {
    wrapper = shallow(<FinishMessageCustom {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
