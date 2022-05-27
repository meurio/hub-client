import { GraphQLClient } from 'graphql-request';
import * as t from '../action-types';

const requestMock = jest.spyOn(GraphQLClient.prototype, 'request');

// eslint-disable-next-line import/first
import asyncAddMobilization, { INSERT_MOBILIZATION_QUERY } from './async-add-mobilization';

describe("async-add-mobilization", () =>  {
  const dispatch = jest.fn();
  const values = { name: 'Test Mobilization' };
  requestMock.mockResolvedValue({
    insert_mobilizations_one: { ...values, id: 2 }
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be call dispatch ADD_MOBILIZATION_REQUEST", async () => {
    await asyncAddMobilization(values)(dispatch);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: t.ADD_MOBILIZATION_REQUEST
    });
  });

  it("should be call request graphql api", async () => {
    await asyncAddMobilization(values)(dispatch);
    expect(requestMock).toHaveBeenCalled();
  });

  it('should be pass result of request to dispatch ADD_MOBILIZATION_SUCCESS', async () => {
    const mobilization = { id: 2, name: 'Test Mobilization' };
    requestMock.mockResolvedValueOnce({
      insert_mobilizations_one: mobilization
    });
    
    await asyncAddMobilization(values)(dispatch);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: t.ADD_MOBILIZATION_SUCCESS,
      payload: mobilization
    });
  });

  it('should be pass values to request graphql', async () => { 
    await asyncAddMobilization(values)(dispatch);
    expect(requestMock.mock.calls[0]).toEqual([INSERT_MOBILIZATION_QUERY, {
      input: values
    }]);
  });

  it('should be call dispatch errors with ADD_MOBILIZATION_FAILURE', async () => {
    const error = 'failed!';
    requestMock.mockRejectedValueOnce(error);

    await asyncAddMobilization(values)(dispatch);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: t.ADD_MOBILIZATION_FAILURE,
      payload: error
    });
  });

  it('should be correct call mobilizations_subthemes', async () => {
    const subthemes = [1234, 2342, 12345]
    await asyncAddMobilization({ ...values, subthemes })(dispatch);
    expect(requestMock.mock.calls[0]).toEqual([INSERT_MOBILIZATION_QUERY, {
      input: {
        ...values,
        mobilizations_subthemes: {
          data: subthemes.map((subtheme_id) => ({ subtheme_id }))
        }
      }
    }]);
  });
});