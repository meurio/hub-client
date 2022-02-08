/* eslint-disable prefer-promise-reject-errors */
import MobSelectors from '../../../../redux/selectors'
import * as MobActionTypes from '../../../../redux/action-types'

//
// The name of this action needs to be refactored to make more sense.
// Besides to have to refact this action name, needs to refact
// API endpoint too.
//
const fillWidget = ({ payload: fill, widget }) => (dispatch, getState, { api }) => {
  const state = getState()

  // For endpoint reference, see: https://github.com/ourcities/hub-api/issues/39
  const endpoint = `/widgets/${widget.id}/fill`
  const body = { fill }

  return api.post(endpoint, body)
    .then(({ data }) => {
      dispatch({
        type: MobActionTypes.UPDATE_WIDGET_SUCCESS,
        payload: updateWidget(state, data)
      })

      /*AnalyticsEvents.pressureSavedData()*/
      return Promise.resolve({ widget })
    })
    .catch(failure => {
      return Promise.reject({ _error: `Response ${failure}` })
    })
}

const updateWidget = (state, payload) => {
  const { widget_id: id, count } = payload
  const widget = MobSelectors(state).getWidget(id)
  return { ...widget, count }
}

export default fillWidget
