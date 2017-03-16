import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'

import Page from '~routes/admin/authenticated/sidebar/mobilizations-settings-sharing/page'

describe('routes/admin/authenticated/sidebar/mobilizations-settings-sharing/page', () => {
  let wrapper
  const props = {
    fields: {
      facebook_share_image: 'facebook_share_image',
      facebook_share_title: 'facebook_share_title',
      facebook_share_description: 'facebook_share_description',
      twitter_share_text: 'twitter_share_text'
    }
  }

  beforeAll(() => {
    wrapper = shallow(<Page {...props} />)
  })

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok
    })
  })
})
