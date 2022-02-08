/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { HelpBlock } from 'components/forms'

describe('client/components/forms/help-block', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(
      <HelpBlock>
        Foo bar
      </HelpBlock>
    )
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
    it('should render <dfn> tag', () => {
      expect(wrapper.find('dfn')).to.have.length(1)
    })
    it('should render <dfn> tag with its text properly', () => {
      expect(wrapper.find('dfn').text()).to.be.equal('Foo bar')
    })
  })
})
