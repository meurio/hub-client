/* eslint-disable no-unused-expressions */
import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { ColorPicker } from 'components/forms'

describe('client/components/forms/color-picker', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeEach(() => {
    wrapper = shallow(<ColorPicker {...props} />, { context: {} })
  })

  it('should render ok by default', () => {
    expect(wrapper).to.be.ok
  })

  it('should set value passed by context', () => {
    wrapper.setContext({
      $formGroup: {
        value: '#fff'
      }
    })
    expect(wrapper.children().props().color).to.equal('#fff')
  })
})
