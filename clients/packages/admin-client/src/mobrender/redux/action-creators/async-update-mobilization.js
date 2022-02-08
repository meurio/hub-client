/* eslint-disable prefer-promise-reject-errors */
import { createAction } from './create-action'
import * as t from '../action-types'
import AuthSelectors from 'account/redux/selectors';

import asyncFetchBlocks from './async-fetch-blocks'
import asyncFetchWidgets from './async-fetch-widgets'

export default ({ fieldName, ...mobilization }) =>
  (dispatch, getState, { api }) => {
      const headers = AuthSelectors(getState()).getCredentials();
    const endpoint = `/mobilizations/${mobilization.id}`
    const config = { headers }

    dispatch({ type: t.UPDATE_MOBILIZATION_REQUEST })
    return api
      .put(endpoint, { mobilization }, config)
      .then(({ status, data }) => {
        dispatch({ type: t.UPDATE_MOBILIZATION_SUCCESS, payload: data })
        if (mobilization.template_mobilization_id) {
          dispatch(asyncFetchBlocks(data.id))
          dispatch(asyncFetchWidgets(data.id))
        }
        return Promise.resolve(data)
      })
      .catch(({ response, ...errors }) => {
        if (response.status === 422 && response.data.errors) {
          const errors = response.data.errors
          if (response.data.errors.custom_domain) {
            errors[fieldName] = errors.custom_domain
            delete errors.custom_domain
          }
          dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, errors))
          return Promise.reject({ ...errors })
        } else {
          dispatch(createAction(t.UPDATE_MOBILIZATION_FAILURE, errors))
          return Promise.reject({ error: `Response code ${errors}` })
        }
      })
  }
