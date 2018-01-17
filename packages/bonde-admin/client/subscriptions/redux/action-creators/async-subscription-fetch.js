import { addNotification } from 'reapop'
import * as notifications from '~client/utils/notifications'
import * as t from '~client/subscriptions/redux/action-types'
import { createAction } from '~client/utils/redux'
import * as AwaitActions from '~client/components/await/redux/action-creators'

//
// Action to fetch the user subscription data.
// For more informations about the endpoint, @see https://github.com/nossas/bonde-server/pull/185
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
    .get(endpoint, config)
    .then(({ data }) => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_FETCH_SUCCESS, data))
    })
    .catch(e => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_FETCH_FAILURE, e))
      dispatch(addNotification(notifications.genericRequestError(intl)))
      return Promise.reject(e)
    })
}
