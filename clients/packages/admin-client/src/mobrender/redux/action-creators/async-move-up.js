import * as t from '../action-types'
import { createAction } from './create-action'

import AuthSelectors from 'account/redux/selectors'
import Selectors from '../selectors'

export default block => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  const mobilization = Selectors(getState()).getMobilization()
  const blocks = Selectors(getState()).getBlocks()

  const previousBlock = blocks[blocks.indexOf(blocks.filter(b => b.id === block.id)[0]) - 1]

  const body = {
    mobilization_id: mobilization.id,
    blocks: [
      {
        ...block,
        position: previousBlock.position
      },
      {
        ...previousBlock,
        position: block.position
      }
    ]
  }

  dispatch(createAction(t.UPDATE_BLOCK_REQUEST))
  return api
    .put(`/mobilizations/${mobilization.id}/blocks`, body, { headers })
    .then(res => {
      dispatch(createAction(t.UPDATE_BLOCK_BATCH, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
