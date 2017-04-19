import { addNotification } from 'reapop'
import * as notifications from '~client/utils/notifications'
import * as t from '~client/subscriptions/redux/action-types'
import { createAction } from '~client/utils/redux'
import * as AwaitActions from '~client/components/await/redux/action-creators'

//
// Action to update the user subscription data and recharge it.
// For more informations about the endpoint, @see https://github.com/nossas/bonde-server/pull/185
// @param values Object({
//   id: Integer|String (required)
//   token: String (required)
//   card_hash: String (required if `process_at` is not defined)
//   process_at: String (required if `card_hash` is not defined)
// })
//
export default values => (dispatch, getState, { api }) => {
  const endpoint = `/subscriptions/${values.id}/recharge`
  const body = values

  dispatch(AwaitActions.setLoading(true))
  dispatch(createAction(t.ASYNC_RECHARGE_REQUEST))
  return api
    .post(endpoint, body)
    .then(({ data }) => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_RECHARGE_SUCCESS, data))
      dispatch(addNotification(notifications.genericRequestSuccess()))
    })
    .catch(e => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_RECHARGE_FAILURE, e))
      dispatch(addNotification(notifications.genericRequestError()))
      return Promise.reject(e)
    })
}
