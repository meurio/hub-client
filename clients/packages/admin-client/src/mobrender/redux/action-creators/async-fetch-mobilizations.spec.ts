import { GraphQLClient } from 'graphql-request';
import * as t from '../action-types';

const requestMock = jest.spyOn(GraphQLClient.prototype, 'request');

// eslint-disable-next-line import/first
import asyncFetchMobilizations, { FETCH_MOBILIZATIONS_QUERY } from './async-fetch-mobilizations';

describe("async-fetch-mobilizations(values)(dispatch, getState*, middleware*)", () => {
  const dispatch = jest.fn();
  requestMock.mockResolvedValue({
    mobilizations: []
  })

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("should dispatch FETCH_MOBILIZATIONS_REQUEST", async () => {
    await asyncFetchMobilizations()(dispatch);

    expect(dispatch.mock.calls[0][0]).toEqual({
      type: 'FETCH_MOBILIZATIONS_REQUEST'
    });
  });

  it("should dispatch FETCH_MOBILIZATIONS_SUCCESS with payload when request successfully", async () => {
    const mobilizations = [{ id: 2, name: 'Test Mobilization' }];
    requestMock.mockResolvedValueOnce({ mobilizations });

    await asyncFetchMobilizations()(dispatch);
    
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'FETCH_MOBILIZATIONS_SUCCESS',
      payload: mobilizations
    });
  });

  it("should dispatch FETCH_MOBILIZATIONS_FAILURE with payload when request failed", async () => {
    const error = 'failed!';
    requestMock.mockRejectedValueOnce(error);

    await asyncFetchMobilizations()(dispatch);

    expect(dispatch.mock.calls[1][0]).toEqual({
      type: 'FETCH_MOBILIZATIONS_FAILURE',
      payload: error
    });
  });

  it("should pass communityId like variable to request", async () => {
    const communityId = 12;
    await asyncFetchMobilizations(communityId)(dispatch);

    expect(requestMock.mock.calls[0]).toEqual([FETCH_MOBILIZATIONS_QUERY, {
      where: {
        community_id: { _eq: communityId }
      }
    }]);
  });
});