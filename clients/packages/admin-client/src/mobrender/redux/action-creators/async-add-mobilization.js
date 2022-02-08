/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import { createAction } from './create-action'
import AuthSelectors from 'account/redux/selectors'

export default values => (dispatch, getState, { api }) => {
  const credentials = AuthSelectors(getState()).getCredentials()
  dispatch(createAction(t.ADD_MOBILIZATION_REQUEST))
  return api
    .post('/mobilizations', { mobilization: values }, { headers: credentials })
    .then(res => {
      dispatch(createAction(t.ADD_MOBILIZATION_SUCCESS, res.data))
      return Promise.resolve(res.data)
    })
    .catch(({ response, ...errors }) => {
      if (response.status === 422 && response.data.errors) {
        return Promise.reject({ ...response.data.errors })
      } else {
        dispatch(createAction(t.ADD_MOBILIZATION_FAILURE, errors))
        return Promise.reject(errors)
      }
    })
}
