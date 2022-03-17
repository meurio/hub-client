/* eslint-disable import/first */
import React from 'react';
import { shallow } from 'enzyme';
import { Loading } from '../../../components/await';

const useQuerySpy = jest.fn();
jest.mock('bonde-core-tools', () => ({
  useQuery: useQuerySpy,
  gql: jest.fn()
}));

const getSpy = jest.fn();
jest.mock('js-cookie', () => ({
  get: getSpy
}));

import SidebarProvider, { SidebarContext } from './Provider';

// Utils
const implementUseQuery = (result) => {
  useQuerySpy.mockImplementation((_query, _args) => {
    return result
  });
}

// Describe tests
describe('SidebarProvider tests', () => {
  // Default implementations cookies and queries
  const communityId = 75;
  getSpy.mockImplementation((key) => {
    return {
      community: JSON.stringify({ id: communityId })
    }[key]
  });
  
  implementUseQuery({ loading: true });

  // Clean mocks
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render is ok', () => {
    const wrapper = shallow(<SidebarProvider />);
    expect(wrapper).toBeTruthy();
  });

  it('should pass community_id to fetch data', () => {
    let result;
    useQuerySpy.mockImplementation((_query, args) => {
      result = args;
      return {
        loading: true
      }
    });

    shallow(<SidebarProvider />);

    expect(result).toEqual({
      variables: { community_id: communityId, status: "active" }
    })
  });

  it('should pass mobilizations fetched to context', () => {
    let result = { id: 345, name: 'Testes unitarios' };
    implementUseQuery({ loading: false, data: { mobilizations: [result] } });

    const wrapper = shallow(<SidebarProvider />);
    const provider = wrapper.find(SidebarContext.Provider);

    expect(provider.props().value.mobilizations).toEqual([result]);
  });

  it('should be render Loading when fetching', () => {
    implementUseQuery({ loading: true });
    const wrapper = shallow(<SidebarProvider />);

    expect(wrapper.find(Loading).length).toEqual(1);
  });

  it('should pass dnsHostedZones fetched to context', () => {
    let result = { id: 234, domain: 'testesunitarios.org' };
    implementUseQuery({ loading: false, data: { dns_hosted_zones: [result] } });

    const wrapper = shallow(<SidebarProvider />);
    const provider = wrapper.find(SidebarContext.Provider);

    expect(provider.props().value.dnsHostedZones).toEqual([result]);
  });

  it('should pass selectMobilization method to context', () => {
    let result = { id: 345, name: 'Testes unitarios' };
    implementUseQuery({ loading: false, data: { mobilizations: [result] } });

    const wrapper = shallow(<SidebarProvider />);
    const provider = wrapper.find(SidebarContext.Provider);

    expect(provider.props().value.selectMobilization).toBeTruthy();
  });

  it('should pass mobilization to context when selectMobilization', () => {
    let result = { id: 345, name: 'Testes unitarios' };
    implementUseQuery({ loading: false, data: { mobilizations: [result] } });

    const wrapper = shallow(<SidebarProvider />);
    const provider = wrapper.find(SidebarContext.Provider);

    // Mobilization not selected
    expect(provider.props().value.mobilization).toBeUndefined();

    // Mobilization selected
    provider.props().value.selectMobilization(result.id);
    const providerUpdated = wrapper.find(SidebarContext.Provider);
    expect(providerUpdated.props().value.mobilization).toEqual(result);
  });
})