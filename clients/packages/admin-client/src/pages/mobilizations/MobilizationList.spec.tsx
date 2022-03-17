/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import { SidebarContext } from '../sidebar/Provider';
import Page from './list/page';

const useContextMock = React.useContext = jest.fn();

// const useLocationMock = jest.fn();
// const useHistoryMock = jest.fn();

const push = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: () => ({ pathname: '/' }),
  useHistory: () => ({ push })
}))

import MobilizationList from './MobilizationList';

describe('MobilizationList scene tests', () => {

  beforeEach(() => {
    useContextMock.mockImplementation(() => ({ mobilizations: [], selectMobilization: jest.fn() }));
    // useLocationMock.mockImplementation(() => ({}));
    // useHistoryMock.mockImplementation(() => ({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders ok', () => {
    const wrapper = shallow(<MobilizationList />);

    expect(wrapper).toBeTruthy();
  });

  it('should get mobilizations on SidebarContext', () => {
    shallow(<MobilizationList />);

    expect(useContextMock.mock.calls[0][0]).toEqual(SidebarContext);
  });

  // it('should useLocation to get location object', () => {
  //   shallow(<MobilizationList />);

  //   expect(useLocationMock.mock.calls.length).toEqual(1);
  // });

  it('should pass sidebar context values to Page', () => {
    const mobilizations = [{ id: 3, name: 'Tests', slug: 'tests' }]
    const selectMobilization = jest.fn();
    useContextMock.mockReturnValue({ mobilizations, selectMobilization });
    
    const wrapper = shallow(<MobilizationList />);
    const page = wrapper.find(Page);
    
    expect(page.props().mobilizations).toEqual(mobilizations);
    expect(page.props().select).toEqual(selectMobilization);
  });

  it('should pass location to Page', () => {
    const pathname = '/';
    // useLocationMock.mockReturnValue({ pathname });
    
    
    const wrapper = shallow(<MobilizationList />);
    const page = wrapper.find(Page);
    
    expect(page.props().location).toEqual({ pathname });
  });

  it('should pass history to Page', () => {
    // const push = jest.fn();
    // useHistoryMock.mockReturnValue({ push });
    
    
    const wrapper = shallow(<MobilizationList />);
    const page = wrapper.find(Page);
    
    expect(page.props().history).toEqual({ push });
  });
});