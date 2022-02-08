import * as CommunitySelectors from '../selectors'
import AuthSelectors from 'account/redux/selectors'

export default () => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  const communityId = CommunitySelectors.getCurrentId(getState())
  const endpoint = `/communities/${communityId}/resync_mailchimp.json`

  return api
    .post(endpoint, {}, { headers })
    .then(({ data }) => {
      return Promise.resolve(data)
    })
    .catch(error => {
      return Promise.reject(error)
    })
}
