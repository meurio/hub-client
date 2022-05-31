import React from 'react';
import { shallow } from 'enzyme';
import PlipDetails from './PlipDetails';

describe('PlipDetails tests', () => {
  // const mockAsyncFillWidget = jest.fn();
  // const mockWidget = {}


  it('should renders ok', () => {
    const wrapper = shallow(
      <PlipDetails pdf={{"data":{"data":{"id":1}}}} />
    );

    expect(wrapper).toBeTruthy();
  });
});