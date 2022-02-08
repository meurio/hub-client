/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import { createAction } from './create-action'

export default query => (dispatch, getState, { api }) => {
  const endpoint = '/mobilizations'
  const config = { params: query }

  dispatch({ type: t.FILTER_MOBILIZATIONS_REQUEST })
  return api.get(endpoint, config)
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch(createAction(t.FILTER_MOBILIZATIONS_SUCCESS, data))
        return Promise.resolve(data)
      }

      return Promise.reject({ message: `Request code ${status}` })
    })
    .catch(failure => {
      dispatch(createAction(t.FILTER_MOBILIZATIONS_FAILURE, failure.message))
      return Promise.reject({ message: `Request ${failure}` })
    })
}
