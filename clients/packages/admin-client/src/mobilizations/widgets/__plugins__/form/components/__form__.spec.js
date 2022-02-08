/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import shallowWithIntl from 'intl/helpers/shallow-with-intl'
import { Form } from 'mobilizations/widgets/__plugins__/form/components/__form__.connected'

describe('client/mobilizations/widgets/__plugins__/form/components/__form__', () => {
  let wrapper
  const props = {
    mobilization: {},
    widget: {
      settings: {
        finish_message_type: 'share'
      }
    },
    block: {},
    editable: true,
    configurable: true,
    hasNewField: false
  }

  beforeAll(() => {
    wrapper = shallowWithIntl(<Form {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
