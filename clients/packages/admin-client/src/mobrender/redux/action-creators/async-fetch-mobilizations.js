import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from 'account/redux/selectors'

export default relationshipId => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials()
  dispatch(createAction(t.FETCH_MOBILIZATIONS_REQUEST))
  if (relationshipId) {
    return api
      .get(`/communities/${relationshipId}/mobilizations`, { headers })
      .then(({ status, data }) => {
        dispatch(createAction(t.FETCH_MOBILIZATIONS_SUCCESS, data))
        return Promise.resolve()
      })
      .catch(ex => {
        dispatch(createAction(t.FETCH_MOBILIZATIONS_FAILURE, ex))
        return Promise.reject(ex)
      })
  }
}
