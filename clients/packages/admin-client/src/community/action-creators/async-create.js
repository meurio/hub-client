/* eslint-disable prefer-promise-reject-errors */
import * as t from 'community/action-types'
import AuthSelectors from 'account/redux/selectors';

const asyncCreate = community => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()

  const endpoint = '/communities'
  const body = { community }
  const config = { headers }

  return api
    .post(endpoint, body, config)
    .then(({ status, data }) => {
      if (status === 400 && data.errors) {
        return Promise.reject({ ...data.errors })
      } else if (status === 200) {
        dispatch({ type: t.ADD, community: data })
        return Promise.resolve()
      }
    })
    .catch(error => {
      if (error.response.data) {
        dispatch({ 
          type: t.SET_ERRORS,
          submitError: error.response.data
        })
      }
      return Promise.reject(error)
    })
}

export default asyncCreate
