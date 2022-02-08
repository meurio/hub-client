/* eslint-disable prefer-promise-reject-errors */
import { toast } from 'react-toastify'
import AuthSelectors from 'account/redux/selectors';
import { createAction } from 'utils/redux'
import * as t from 'community/action-types'
import * as AwaitActions from 'components/await/redux/action-creators'
import { genericRequestError, communityInviteSuccess } from 'utils/notifications'

const COMMUNITY_USER_ROLES = {
  owner: 1,
  admin: 2,
  participant: 3
}

export default ({ communityId, email }) => (dispatch, getState, { api, intl }) => {
  const headers = AuthSelectors(getState()).getCredentials();

  const endpoint = `/communities/${communityId}/invitation`
  const body = { invitation: { email, role: COMMUNITY_USER_ROLES.admin } }
  const options = { headers }

  dispatch(AwaitActions.setLoading(true))
  dispatch(createAction(t.ASYNC_INVITE_REQUEST))

  return api
    .post(endpoint, body, options)
    .then(({ status, data }) => {
      dispatch(AwaitActions.setLoading(false))

      if (status === 400 && data.errors) {
        toast.error(genericRequestError(intl).message, { 
          autoClose: 5000,
          hideProgressBar: true,
        })
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        toast.success(communityInviteSuccess(intl, email).message, { 
          autoClose: 5000,
          hideProgressBar: true,
        })
        dispatch(createAction(t.ASYNC_INVITE_SUCCESS, data))
        return Promise.resolve()
      }
    })
    .catch(error => {
      toast.error(genericRequestError(intl).message, { 
        autoClose: 5000,
        hideProgressBar: true,
      })
      dispatch(AwaitActions.setLoading(false))
      dispatch(createAction(t.ASYNC_INVITE_FAILURE, error))
      return Promise.reject(error)
    })
}
