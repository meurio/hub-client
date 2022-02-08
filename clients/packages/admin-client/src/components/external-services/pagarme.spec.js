/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import { Pagarme } from 'components/external-services'

describe('client/components/external-services/pagarme', () => {
  const wrapper = shallow(<Pagarme />)

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })

    it('should render an empty <span /> tag element', () => {
      expect(wrapper.find('span')).to.have.length(1)
    })
  })
})
