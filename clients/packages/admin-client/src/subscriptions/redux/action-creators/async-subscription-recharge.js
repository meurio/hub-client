import { toast } from 'react-toastify'
import * as notifications from 'utils/notifications'
import * as t from 'subscriptions/redux/action-types'
import { createAction } from 'utils/redux'
import * as AwaitActions from 'components/await/redux/action-creators'

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
export default values => (dispatch, getState, { api, intl }) => {
  const endpoint = `/subscriptions/${values.id}/recharge`
  const body = values

  dispatch(AwaitActions.setLoading(true))
  dispatch(createAction(t.ASYNC_RECHARGE_REQUEST))
  return api
    .post(endpoint, body)
    .then(({ data }) => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_RECHARGE_SUCCESS, data))
      toast.sucess(notifications.genericSaveSuccess(intl).message, { 
        autoClose: 5000,
        hideProgressBar: true,
      })
    })
    .catch(e => {
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_RECHARGE_FAILURE, e))

      toast.error(notifications.genericRequestError(intl).message, { 
        autoClose: 5000,
        hideProgressBar: true,
      })
      return Promise.reject(e)
    })
}
