/* eslint-disable prefer-promise-reject-errors */
import * as t from '../ActionTypes';
import { createAction } from './CreateAction';

export default (where: any) => (dispatch: any, _: any, { api }: any) => {
  const endpoint = '/widgets';
  const config = { params: where };

  dispatch({ type: t.FILTER_WIDGETS_REQUEST });
  return api
    .get(endpoint, config)
    .then((response: any) => {
      dispatch(createAction(t.FILTER_WIDGETS_SUCCESS, response.data));
      return Promise.resolve(response.data);
    })
    .catch((failure: any) => {
      dispatch(createAction(t.FILTER_WIDGETS_FAILURE, failure));
      Promise.reject({ _error: `Response ${failure}` });
    });
};
