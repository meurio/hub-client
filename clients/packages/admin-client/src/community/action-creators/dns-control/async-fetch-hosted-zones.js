import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'
import AuthSelectors from 'account/redux/selectors'

export default () => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_REQUEST))
  return api.get(`/communities/${community.id}/dns_hosted_zones`, { headers })
    .then(res => {
      dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_SUCCESS, res.data))
    })
    .catch(ex => {
      dispatch(createAction(t.FETCH_DNS_HOSTED_ZONES_FAILURE, ex))
      return Promise.reject(ex)
    })
}
