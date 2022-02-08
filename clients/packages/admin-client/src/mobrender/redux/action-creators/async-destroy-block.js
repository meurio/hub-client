import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from 'account/redux/selectors'
import MobSelectors from 'mobrender/redux/selectors'

export default (block) => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  const mobilization = MobSelectors(getState()).getMobilization()

  dispatch(createAction(t.DESTROY_BLOCK_REQUEST))
  return api
    .delete(`/mobilizations/${mobilization.id}/blocks/${block.id}`, { headers })
    .then(response => {
      dispatch(createAction(t.DESTROY_BLOCK_SUCCESS, response.data))
      return Promise.resolve()
    })
    .catch(ex => {
      dispatch(createAction(t.DESTROY_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
