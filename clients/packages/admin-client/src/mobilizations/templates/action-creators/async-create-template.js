/* eslint-disable prefer-promise-reject-errors */
import * as t from '../action-types'
import AuthSelectors from 'account/redux/selectors';

const AsyncCreateTemplate = template => (dispatch, getState, { api }) => {
  dispatch({ type: t.REQUEST_TEMPLATE_CREATE })

  const headers = AuthSelectors(getState()).getCredentials();
  return api
    .post('/templates', template, { headers })
    .then(({ status, data }) => {
      if (status === 200) {
        dispatch({ type: t.SUCCESS_TEMPLATE_CREATE, template: data })
        return Promise.resolve()
      } else {
        dispatch({ type: t.FAILURE_TEMPLATE_CREATE, template: data })
        return Promise.reject({ _error: `Response code ${status}` })
      }
    })
    .catch(error => console.error('CreateTemplateAsyncError', error))
}

export default AsyncCreateTemplate
