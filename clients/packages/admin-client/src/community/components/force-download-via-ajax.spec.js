/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import ForceDownloadViaAjax from 'community/components/force-download-via-ajax'

describe('client/community/components/force-download-via-ajax', () => {
  let wrapper
  const props = {
    onClick: mock.noop,
    title: 'Foo bar'
  }

  beforeAll(() => {
    wrapper = shallow(<ForceDownloadViaAjax {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
