import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from 'account/redux/selectors'

export default mobilizationId => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()

  dispatch(createAction(t.FETCH_WIDGETS_REQUEST))
  return api
    .get(`/mobilizations/${mobilizationId}/widgets`, { headers })
    .then(res => {
      dispatch(createAction(t.FETCH_WIDGETS_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.FETCH_WIDGETS_FAILURE, ex))
      return Promise.reject(ex)
    })
}
