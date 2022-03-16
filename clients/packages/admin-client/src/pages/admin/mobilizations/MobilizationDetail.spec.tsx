/* eslint-disable import/first */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { SidebarContext } from '../sidebar/Provider';
import MobilizationDetailProvider from './MobilizationDetailProvider';

const useContextMock = React.useContext = jest.fn();

jest.mock('react-redux', () => ({
  connect: (_mapState, _mapActions) => (Component) => Component
}))

jest.mock('react-router-dom', () => ({
  withRouter: (Component) => Component,
  useParams: () => ({
    mobilization_id: '3455'
  })
}));

import MobilizationDetail from './MobilizationDetail';

describe('MobilizationDetail scene tests', () => {

  beforeEach(() => {
    // useParamsMock.mockImplementation(() => ({}));
    useContextMock.mockImplementation(() => ({}));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render ok', () => {
    const wrapper = shallow(<MobilizationDetail />);

    expect(wrapper).toBeTruthy();
  });

  // it('should useParams to get mobilization id', () => {
  //   useParamsMock.mockReturnValue({ mobilization_id: 4 });
    
  //   shallow(<MobilizationDetail />);
  //   expect(useParamsMock.mock.calls.length).toEqual(1);
  // });

  it('should call useContext with SidebarContext', () => {
    shallow(<MobilizationDetail />);
    expect(useContextMock.mock.calls[0][0]).toEqual(SidebarContext);
  });

  it('should change mobilization to config params url', () => {
    const selectMobilization = jest.fn();
    useContextMock.mockReturnValue({ selectMobilization, fetching: false });

    mount(<MobilizationDetail />);

    expect(selectMobilization.mock.calls[0][0]).toEqual(3455);
  });

  it('should pass mobilization to MobilizationDetailProvider', () => {
    const mobilization = { id: 3455, name: 'Test' };
    useContextMock.mockReturnValue({ mobilization });

    const wrapper = shallow(<MobilizationDetail />);

    expect(wrapper.find(MobilizationDetailProvider).length).toEqual(1);
  });
});

// TODO

// - test pass history to MobilizationEditScene props
// - test pass mobilization, blocks, blocksIsLoaded to MobilizationEditScene props