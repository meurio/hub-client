import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

// Current module dependencies
import { SettingsMenu } from '~widget-plugins/pressure/components'

describe('client/mobilizations/widgets/__plugins__/pressure/components/settings-menu', () => {
  let wrapper
  const props = {
    location: { pathname: 'foo/bar' },
    mobilization: { id: 1 },
    widget: { id: 1 }
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
