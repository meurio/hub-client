/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import AuthSelectors from 'account/redux/selectors';

const AsyncFetch = community => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials();
  const config = {
    headers,
    params: { community_id: community.id }
  }

  dispatch({ type: t.REQUEST_TEMPLATE_FETCH })
  return api
    .get('/templates', config)
    .then(({ status, data }) => {
      dispatch({ type: t.SUCCESS_TEMPLATE_FETCH, templates: data })
      return Promise.resolve()
    })
    .catch(error => {
      dispatch({ type: t.FAILURE_TEMPLATE_FETCH, error })
      return Promise.reject({ _error: `Response ${error}` })
    })
}

export default AsyncFetch
