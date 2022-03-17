/* eslint-disable no-unused-expressions */
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Avatar } from '../../../../../mobilizations/components/list/items';

describe('client/mobilizations/components/list/items/avatar', () => {
  let wrapper;
  const props = {
    image: 'image',
    facebook_share_image: 'facebook_share_image',
    imageSize: {
      width: '100px',
      height: '100px',
    },
  };

  beforeEach(() => {
    wrapper = shallow(<Avatar {...props} />);
  });

  describe('#render', () => {
    it('should render without crash', () => {
      expect(wrapper).to.be.ok;
    });
  });
});
