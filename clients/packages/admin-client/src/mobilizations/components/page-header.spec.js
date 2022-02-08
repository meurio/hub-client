import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import { PageHeader } from 'mobilizations/components'

describe('client/mobilizations/components/page-header', () => {
  const context = { router: {} }
  let wrapper
  const props = {
    location: { pathname: '', query: {} },
    mobilization: { id: 1 }
  }

  beforeEach(() => {
    wrapper = shallow(<PageHeader {...props} />, { context })
  })

  describe('#render', () => {
    it('should render add new mobilization button', () => {
      expect(wrapper.find('Button').length).to.equal(1)
    })

    describe('tabs', () => {
      it('should render one <Tabs> parent component', () => {
        expect(wrapper.find('Tabs')).to.have.length(1)
      })
      it('should render 3 <Tab> children component', () => {
        expect(wrapper.find('Tab')).to.have.length(3)
      })
    })
  })
})
