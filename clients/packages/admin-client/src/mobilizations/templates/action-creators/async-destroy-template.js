/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import AuthSelectors from 'account/redux/selectors';

const AsyncDestroyTemplate = template => (dispatch, getState, { api }) => {
  const headers = AuthSelectors(getState()).getCredentials();

  dispatch({ type: t.REQUEST_TEMPLATE_DESTROY })
  return api
      .delete(`/templates/${template.id}`, { headers })
      .then(() => {
        dispatch({ type: t.SUCCESS_TEMPLATE_DESTROY, template })
        return Promise.resolve()
      })
      .catch(error => {
        dispatch({ type: t.FAILURE_TEMPLATE_DESTROY, error })
        return Promise.reject({ _error: `Response ${error}` })
      })
}

export default AsyncDestroyTemplate
