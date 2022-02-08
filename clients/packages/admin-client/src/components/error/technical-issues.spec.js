/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { TechnicalIssues } from 'components/error'

describe('client/components/error/technical-issues', () => {
  let wrapper
  const props = {
    dispatch: () => {}
  }

  beforeAll(() => {
    wrapper = shallow(<TechnicalIssues {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
