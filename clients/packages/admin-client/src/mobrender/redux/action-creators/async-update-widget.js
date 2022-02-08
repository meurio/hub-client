import { createAction } from './create-action'
import * as t from '../action-types'

import AuthSelectors from 'account/redux/selectors'
import Selectors from '../selectors'

export default (widget) => (dispatch, getState, { api }) => {
  dispatch(createAction(t.UPDATE_WIDGET_REQUEST))
  const credentials = AuthSelectors(getState()).getCredentials()
  const mobilization = Selectors(getState()).getMobilization()

  const endpoint = `/mobilizations/${mobilization.id}/widgets/${widget.id}`
  const body = { widget }
  const options = { headers: credentials }

  return api
    .put(endpoint, body, options)
    .then(res => {
      dispatch(createAction(t.UPDATE_WIDGET_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.UPDATE_WIDGET_FAILURE, ex))
      return Promise.reject(ex)
    })
}
