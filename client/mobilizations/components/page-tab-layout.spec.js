import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { PageTabLayout } from '~client/mobilizations/components'

describe('client/mobilizations/components/page-tab-layout', () => {
  let wrapper
  const props = {
    mobilization: { id: 1 },
    location: { pathname: 'foo/bar' }
  }

  beforeAll(() => {
    wrapper = shallow(<PageTabLayout {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
