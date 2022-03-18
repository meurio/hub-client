import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import * as mock from '../../../../../../../utils/mock';
import Page from './page';

describe('routes/admin/authenticated/sidebar/widgets-form-settings/fields/page', () => {
  let wrapper;
  const props = {
    mobilization: {},
    widget: {},
    asyncWidgetUpdate: mock.noop,
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
