/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { SettingsMenu } from 'mobilizations/components'

describe('client/mobilizations/components/settings-menu', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    location: { pathname: 'foo/bar' }
  }

  beforeAll(() => {
    wrapper = shallow(<SettingsMenu {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
