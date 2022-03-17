/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { CreatedAt } from '../../../../mobilizations/components/list/items';

describe('client/mobilizations/components/list/items/created-at', () => {
  let wrapper;
  const props = {};

  describe('CreatedAt', () => {
    beforeEach(() => {
      wrapper = shallow(<CreatedAt {...props} />);
    });

    describe('#render', () => {
      it('should render without crash', () => {
        expect(wrapper).to.be.ok;
      });
    });
  });

  describe('Header', () => {
    beforeEach(() => {
      wrapper = shallow(<CreatedAt.Header {...props} />);
    });

    it('should render root div.created-at-header', () => {
      expect(wrapper.find('div.created-at-header')).to.have.length(1);
    });
  });
});
