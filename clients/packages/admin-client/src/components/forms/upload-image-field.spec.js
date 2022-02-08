/* eslint-disable no-unused-expressions */
import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import * as mock from 'utils/mock'
import { UploadImageField } from 'components/forms'

describe('client/components/forms/upload-image-field', () => {
  let wrapper
  const context = {
    $formGroup: {
      value: 'foo bar',
      onChange: mock.noop
    }
  }
  const props = {
    signingUrl: 'http://domain.com/image.png',
    theme: 'classic'
  }

  beforeAll(() => {
    wrapper = shallow(<UploadImageField {...props} />, { context })
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
