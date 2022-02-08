import * as t from '../../action-types'
import { createAction } from '../create-action'
import * as CommunitySelectors from '../../selectors'
import AuthSelectors from 'account/redux/selectors'

export default dnsHostedZone => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  const community = CommunitySelectors.getCurrent(getState())

  dispatch(createAction(t.FETCH_DNS_RECORDS_REQUEST))
  return api
    .get(`/communities/${community.id}/dns_hosted_zones/${dnsHostedZone.id}/dns_records`, { headers: credentials })
    .then(resp => {
      dispatch(createAction(t.FETCH_DNS_RECORDS_SUCCESS, resp.data))
      return Promise.resolve(resp.data)
    })
    .catch(ex => {
      dispatch(createAction(t.FETCH_DNS_RECORDS_FAILURE, ex))
      return Promise.reject(ex)
    })
}
