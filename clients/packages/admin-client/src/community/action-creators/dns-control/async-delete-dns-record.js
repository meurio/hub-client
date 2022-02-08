import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'
import AuthSelectors from 'account/redux/selectors'

export default ({
  dns_hosted_zone_id: dnsHostedZoneId,
  ...dnsRecord
}) => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  const endpoint = `/communities/${community.id}/dns_hosted_zones/${dnsHostedZoneId}/dns_records/${dnsRecord.id}`
  dispatch(createAction(t.DELETE_DNS_RECORD_REQUEST))
  return api
    .delete(endpoint, { headers: credentials })
    .then(() => {
      dispatch(createAction(t.DELETE_DNS_RECORD_SUCCESS, dnsRecord))
      return Promise.resolve(dnsRecord)
    })
    .catch(ex => {
      dispatch(createAction(t.DELETE_DNS_RECORD_FAILURE, ex))
      return Promise.reject(ex)
    })
}
