import * as t from '../../action-types'
import { createAction } from '../create-action'
import AuthSelectors from 'account/redux/selectors'
import * as CommunitySelectors from '../../selectors'

export default dnsHostedZone => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())
  dispatch(createAction(t.CHECK_DNS_HOSTED_ZONE_REQUEST))
  return api
    .get(`/communities/${community.id}/dns_hosted_zones/${dnsHostedZone.id}/check`, { headers: credentials })
    .then(resp => {
      dispatch(createAction(t.CHECK_DNS_HOSTED_ZONE_SUCCESS, resp.data))
      return Promise.resolve(resp.data)
    })
    .catch(ex => {
      dispatch(createAction(t.CHECK_DNS_HOSTED_ZONE_FAILURE, ex))
      return Promise.reject(ex)
    })
}
