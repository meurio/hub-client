import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from 'account/redux/selectors'

import MobSelectors from '../selectors'

export default ({ mobilization_id: mobilizationId, ...values }) => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const lastPosition = MobSelectors(getState()).getBlockLastPosition()
  const block = { ...values, position: lastPosition + 1 }

  dispatch(createAction(t.ADD_BLOCK_REQUEST))
  return api
    .post(`/mobilizations/${mobilizationId}/blocks`, { block }, { headers: credentials })
    .then(res => {
      const { widgets_attributes, ...data } = res.data
      dispatch(createAction(t.ADD_BLOCK_SUCCESS, data))
      dispatch(createAction(t.ADD_WIDGETS_SUCCESS, widgets_attributes.sort((a, b) => a.id - b.id)))
    })
    .catch(ex => {
      dispatch(createAction(t.ADD_BLOCK_FAILURE, ex))
      return Promise.reject(ex)
    })
}
