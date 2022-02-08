import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from 'account/redux/selectors'

export default mobilizationId => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  dispatch(createAction(t.FETCH_BLOCKS_REQUEST))
  return api
    .get(`/mobilizations/${mobilizationId}/blocks`, { headers })
    .then(response => {
      dispatch(createAction(t.FETCH_BLOCKS_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(ex => {
      dispatch(createAction(t.FETCH_BLOCKS_FAILURE, ex))
      return Promise.reject(ex)
    })
}
