/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import { createAction } from './create-action'

export default where => (dispatch, getState, { api }) => {
  const endpoint = '/widgets'
  const config = { params: where }

  dispatch({ type: t.FILTER_WIDGETS_REQUEST })
  return api
    .get(endpoint, config)
    .then(response => {
      dispatch(createAction(t.FILTER_WIDGETS_SUCCESS, response.data))
      return Promise.resolve(response.data)
    })
    .catch(failure => {
      dispatch(createAction(t.FILTER_WIDGETS_FAILURE, failure))
      Promise.reject({ _error: `Response ${failure}` })
    })
}
