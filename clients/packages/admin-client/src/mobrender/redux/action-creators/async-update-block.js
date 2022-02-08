import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from 'account/redux/selectors'
import Selectors from '../selectors'

export default (block) => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  const mobilization = Selectors(getState()).getMobilization()
  dispatch(createAction(t.UPDATE_BLOCK_REQUEST))
  return api
    .put(`/mobilizations/${mobilization.id}/blocks/${block.id}`, { block }, { headers })
    .then(res => {
      dispatch(createAction(t.UPDATE_BLOCK_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
