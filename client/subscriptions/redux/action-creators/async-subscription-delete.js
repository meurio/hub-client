import { addNotification as notify } from 'reapop'
import * as notifications from '~client/utils/notifications'
import * as t from '~client/subscriptions/redux/action-types'
import { createAction } from '~client/utils/redux'
import * as AwaitActions from '~client/components/await/redux/action-creators'

//
// Action to cancel a subscription.
//
// @param Object({
//   id: Integer|String (required)
//   token: String (required)
// })
//
export default ({ id, token }) => (dispatch, getState, { api, intl }) => {
  const endpoint = `/subscriptions/${id}`
  const config = { params: { token } }

  dispatch(AwaitActions.setLoading(true))
  return api
    .delete(endpoint, config)
    .then(({ data }) => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_FETCH_SUCCESS, data))
      dispatch(notify(notifications.subscriptionCancelSuccess(intl)))
    })
    .catch(e => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_FETCH_FAILURE, e))
      dispatch(notify(notifications.genericRequestError()))
      return Promise.reject(e)
    })
}
