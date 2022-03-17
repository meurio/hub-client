import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Page from './page';

describe('routes/admin/authenticated/sidebar/mobilizations-settings-analytics/page', () => {
  let wrapper;
  const props = {
    fields: {
      google_analytics_code: 'UA-12345678',
    },
  };
  const context = { router: {} };

  beforeEach(() => {
    wrapper = shallow(<Page {...props} />, { context });
  });

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok;
    });
  });
});
