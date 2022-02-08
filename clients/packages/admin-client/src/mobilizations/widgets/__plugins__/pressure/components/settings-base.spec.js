/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SettingsBase } from 'mobilizations/widgets/__plugins__/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/settings-base', () => {
  let wrapper
  const props = {
    location: {
      pathname: 'foo/bar'
    },
    mobilization: {
      id: 1
    },
    widget: {
      id: 1
    }
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsBase {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
