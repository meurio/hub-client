import React from 'react';
import { shallow } from "enzyme";
import { Loading, LoadingSVG } from '../src';

describe('Loading', () => {
  it('renders without crashing', () => {
    const component = shallow(<Loading message="Loading components...." />);
    expect(component).toBeTruthy();
  });

  it('renders Loading icon svg', () => {
    const component = shallow(<Loading message="Loading components...." />);
    expect(component.find(LoadingSVG).length).toBe(1);
  });
});
