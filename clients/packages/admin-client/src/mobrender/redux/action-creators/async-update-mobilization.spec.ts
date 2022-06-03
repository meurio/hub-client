import { GraphQLClient } from 'graphql-request';
import * as t from '../action-types';

const requestMock = jest.spyOn(GraphQLClient.prototype, 'request');

// eslint-disable-next-line import/first
import asyncUpdateMobilization, { UPDATE_MOBILIZATION_QUERY, UPDATE_MOBILIZATION_ONLY_QUERY } from './async-update-mobilization';

describe("async-update-mobilization", () =>  {
  const dispatch = jest.fn();
  const getState = jest.fn().mockImplementation(() => ({
    mobilizations: {
      list: []
    }
  }))
  const id = 3;
  const values = { name: 'Test Mobilization', slug: 'test-mobilization' };
  requestMock.mockResolvedValue({
    update_mobilizations_by_pk: { ...values, id }
  })

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should be call dispatch UPDATE_MOBILIZATION_REQUEST", async () => {
    await asyncUpdateMobilization({ ...values, id })(dispatch, getState);
    expect(dispatch.mock.calls[0][0]).toEqual({
      type: t.UPDATE_MOBILIZATION_REQUEST
    });
  });

  it("should be call request graphql api", async () => {
    await asyncUpdateMobilization({ ...values, id })(dispatch, getState);
    expect(requestMock).toHaveBeenCalled();
  });

  it('should be pass result of request to dispatch UPDATE_MOBILIZATION_SUCCESS', async () => {
    const mobilization = { id: 2, name: 'Test Mobilization' };
    requestMock.mockResolvedValueOnce({
      update_mobilizations_by_pk: mobilization
    });
    
    await asyncUpdateMobilization({ ...values, id })(dispatch, getState);
    expect(dispatch.mock.calls[1][0]).toEqual({
      type: t.UPDATE_MOBILIZATION_SUCCESS,
      payload: mobilization
    });
  });

  it('should be pass values to request graphql', async () => { 
    await asyncUpdateMobilization({ ...values, id })(dispatch, getState);
    expect(requestMock.mock.calls[0]).toEqual([UPDATE_MOBILIZATION_ONLY_QUERY, {
      id,
      input: values
    }]);
  });

  it('should be call only update mobilization when subthemes is equal', async () => {
    getState.mockReturnValueOnce({
      mobilizations: {
        list: {
          data: [{ id, ...values, mobilizations_subthemes: [{ subtheme: { id: 1, label: 'x' } }, { subtheme: { id: 2, label: 'y' } }] }],
          currentId: id
        }
      }
    });

    await asyncUpdateMobilization({ ...values, subthemes: [1, 2], id })(dispatch, getState);
    expect(requestMock.mock.calls[0]).toEqual([UPDATE_MOBILIZATION_ONLY_QUERY, {
      id,
      input: values
    }]);
  });

  it('should be call dispatch errors with UPDATE_MOBILIZATION_FAILURE', async () => {
    const error = 'failed!';
    requestMock.mockRejectedValueOnce(error);
    expect.assertions(2);

    try {
      await asyncUpdateMobilization({ ...values, id })(dispatch, getState)
    } catch (err) {
      expect(err).toEqual({ _error: error });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: t.UPDATE_MOBILIZATION_FAILURE,
        payload: error
      });
    }
  });

  it('should be call dispatch errors when slug exists', async () => {
    const error = { message: 'Uniqueness violation. duplicate key value violates unique constraint "index_mobilizations_on_slug"' };
    requestMock.mockRejectedValueOnce(error);
    expect.assertions(2);

    try {
      await asyncUpdateMobilization({ ...values, id })(dispatch, getState)
    } catch (err) {
      expect(err).toEqual({ slug: `Slug deve ser único e "${values.slug}" já existe!` });
      expect(dispatch.mock.calls[1][0]).toEqual({
        type: t.UPDATE_MOBILIZATION_FAILURE,
        payload: `Slug deve ser único e "${values.slug}" já existe!`
      });
    }
  });

  it('should be correct call mobilizations_subthemes', async () => {
    const subthemes = [1234, 2342, 12345]
    await asyncUpdateMobilization({ ...values, id, subthemes })(dispatch, getState);
    expect(requestMock.mock.calls[0]).toEqual([UPDATE_MOBILIZATION_QUERY, {
      id: id,
      input: values,
      subthemes: subthemes.map((subtheme_id) => ({ mobilization_id: id, subtheme_id }))
    }]);
  });
});