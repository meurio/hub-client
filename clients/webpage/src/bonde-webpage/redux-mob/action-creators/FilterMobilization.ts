/* eslint-disable prefer-promise-reject-errors */
import * as t from '../ActionTypes';
import { createAction } from './CreateAction';

export default (query: any) => (dispatch: any, _: any, { api }: any) => {
  const endpoint = '/mobilizations';
  const config = { params: query };

  dispatch({ type: t.FILTER_MOBILIZATIONS_REQUEST });
  return api
    .get(endpoint, config)
    .then(({ status, data }: { status: number; data: any }) => {
      if (status === 200) {
        dispatch(createAction(t.FILTER_MOBILIZATIONS_SUCCESS, data));
        return Promise.resolve(data);
      }

      return Promise.reject({ message: `Request code ${status}` });
    })
    .catch((failure: any) => {
      dispatch(createAction(t.FILTER_MOBILIZATIONS_FAILURE, failure.message));
      return Promise.reject({ message: `Request ${failure}` });
    });
};
