/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { MoreMenuAction } from '../../../../../mobilizations/components/list/items';

describe('client/mobilizations/components/list/items/more/menu-action', () => {
  let wrapper;
  const props = {
    text: '',
    icon: '',
    path: '',
  };

  beforeEach(() => {
    wrapper = shallow(<MoreMenuAction {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok;
    });
  });
});
