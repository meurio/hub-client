/* eslint-disable prefer-promise-reject-errors */
import { createAction } from './CreateAction';
import * as t from '../ActionTypes';

export default (where: any) => (dispatch: any, _: any, { api }: any) => {
  const endpoint = '/blocks';
  const config = { params: where };

  dispatch({ type: t.FILTER_BLOCKS_REQUEST });
  return api
    .get(endpoint, config)
    .then((response: any) => {
      dispatch(createAction(t.FILTER_BLOCKS_SUCCESS, response.data));
      return Promise.resolve(response.data);
    })
    .catch((failure: any) => {
      dispatch(createAction(t.FILTER_BLOCKS_FAILURE, failure));
      return Promise.reject({ _error: `Response ${failure}` });
    });
};
