import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Page from './page';

describe('routes/admin/authenticated/sidebar/mobilizations-settings-sharing/page', () => {
  let wrapper;
  const props = {
    fields: {
      facebook_share_image: 'facebook_share_image',
      facebook_share_title: 'facebook_share_title',
      facebook_share_description: 'facebook_share_description',
      twitter_share_text: 'twitter_share_text',
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Page {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok;
    });
  });
});
