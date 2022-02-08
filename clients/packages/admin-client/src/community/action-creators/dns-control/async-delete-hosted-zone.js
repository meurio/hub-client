import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'
import AuthSelectors from 'account/redux/selectors'

export default dnsHostedZone => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.DELETE_DNS_HOSTED_ZONE_REQUEST))
  return api
    .delete(`/communities/${community.id}/dns_hosted_zones/${dnsHostedZone.id}`, { headers: credentials })
    .then(resp => {
      dispatch(createAction(t.DELETE_DNS_HOSTED_ZONE_SUCCESS, dnsHostedZone))
      return Promise.resolve(dnsHostedZone)
    })
    .catch(ex => {
      dispatch(createAction(t.DELETE_DNS_HOSTED_ZONE_FAILURE, ex))
      return Promise.reject(ex)
    })
}
