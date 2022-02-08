/* eslint-disable prefer-promise-reject-errors */
import AnalyticsEvents from 'mobilizations/widgets/utils/analytics-events'
import MobSelectors from 'mobrender/redux/selectors'
import * as t from '../action-types'
import { createAction } from './create-action'

const asyncFormEntryCreate = ({ mobilization, formEntry }) => (dispatch, getState, { api }) => {
  const state = getState()

  const endpoint = `/mobilizations/${mobilization.id}/form_entries`
  const body = { form_entry: formEntry }

  dispatch({ type: t.WIDGET_FORM_ENTRY_CREATE_REQUEST })
  return api.post(endpoint, body)
    .then(({ data }) => {
      dispatch(createAction(t.WIDGET_FORM_ENTRY_CREATE_SUCCESS, updateWidget(state, data)))
      AnalyticsEvents.formSavedData()
      return Promise.resolve()
    })
    .catch(failure => {
      dispatch(createAction(t.WIDGET_FORM_ENTRY_CREATE_FAILURE, failure))
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidget = (state, payload) => {
  const widget = MobSelectors(state).getWidget(payload.widget_id)
  return { ...widget, form_entries_count: widget.form_entries_count + 1 }
}

export default asyncFormEntryCreate
