import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'
// Dependency module
import AuthSelectors from 'account/redux/selectors'

export default dnsHostedZone => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.ADD_DNS_HOSTED_ZONE_REQUEST))
  return api
    .post(`/communities/${community.id}/dns_hosted_zones`,
          { dns_hosted_zone: dnsHostedZone },
          { headers: credentials })
    .then(resp => {
      dispatch(createAction(t.ADD_DNS_HOSTED_ZONE_SUCCESS, resp.data))
      return Promise.resolve(resp.data)
    })
    .catch(ex => {
      dispatch(createAction(t.ADD_DNS_HOSTED_ZONE_FAILURE, ex))
      return Promise.reject(ex)
    })
}
