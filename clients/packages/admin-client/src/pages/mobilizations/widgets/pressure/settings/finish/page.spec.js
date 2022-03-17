import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Page from './page';

describe('routes/admin/authenticated/sidebar/widgets-pressure-settings/finish/page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Page />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper).to.be.ok;
    });
  });
});
