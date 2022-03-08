import React from 'react';
import { shallow } from 'enzyme';
import type { ProviderProperties } from '../src/session/Provider';

// Mock dependencies
// jest.mock('@apollo/client');

const spy = jest.fn()
jest.mock('../src/session/createGraphQLClient', () => spy);

// Import
import { Provider as Session, Context } from '../src';

describe('Session provider tests', () => {
  const properties: ProviderProperties = {
    appDomain: 'bonde.devel'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should be render is ok", () => {
    const session = shallow(<Session {...properties} />);

    expect(session).toBeTruthy();
  });

  it("should be create graphql client with endpoint config", () => {
    shallow(<Session {...properties} />);
    
    expect(spy.mock.calls.length).toEqual(1);
    expect(spy.mock.calls[0][0]).toEqual(`http://api-graphql.${properties.appDomain}/v1/graphql`);
  });

  it("should be create graphql client with custom endpoint config", () => {
    const customApiUrl = 'http://my-custom-api-graphql.bonde.devel';
    shallow(<Session {...properties} apiGraphQLUrl={customApiUrl} />);
    
    expect(spy.mock.calls.length).toEqual(1);
    expect(spy.mock.calls[0][0]).toEqual(customApiUrl);
  });

  describe('app urls', () => {

    it("should be configure apps url", () => {
      const session = shallow(
        <Session {...properties} />
      );
  
      expect((session.find(Context.Provider).props().value as any).apps)
        .toEqual({
          settings: `http://admin-canary.${properties.appDomain}/community/settings`,
          redes: `http://redes.${properties.appDomain}`,
          chatbot: `http://chatbot.${properties.appDomain}`,
          mobilization: `http://app.${properties.appDomain}`
        });
    });

    it("should be configure apps custom protocol url", () => {
      const session = shallow(
        <Session {...properties} protocol='https' />
      );
  
      expect((session.find(Context.Provider).props().value as any).apps)
        .toEqual({
          settings: `https://admin-canary.${properties.appDomain}/community/settings`,
          redes: `https://redes.${properties.appDomain}`,
          chatbot: `https://chatbot.${properties.appDomain}`,
          mobilization: `https://app.${properties.appDomain}`
        });
    });
  });
})