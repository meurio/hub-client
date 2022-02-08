import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'

import List from 'mobilizations/components/list'

describe('client/mobilizations/components/list/index', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(
      <List>
        <h1>Foo Bar</h1>
      </List>
    )
  })

  describe('#render', () => {
    it('should render one div.list', () => {
      expect(wrapper.find('div.list')).to.have.length(1)
    })
    it('should render one <h1> children element as passed', () => {
      expect(wrapper.find('div.list h1')).to.have.length(1)
    })
    it('should render one <h1> children element with its content properly', () => {
      expect(wrapper.find('div.list h1').text()).to.be.equal('Foo Bar')
    })
  })
})
