/* eslint-disable prefer-promise-reject-errors */
// import MobSelectors from '../Selectors';
// import * as MobActionTypes from '../ActionTypes';
// import AnalyticsEvents from '../../plugins/Pressure/Analytics';
//
// The name of this action needs to be refactored to make more sense.
// Besides to have to refact this action name, needs to refact
// API endpoint too.
//
const asyncFillWidget = ({ payload: fill, widget }: any) => async (
  _dispatch: any,
  _getState: any,
  { api }: any
) => {
  // const state = getState();

  // For endpoint reference, see: https://github.com/ourcities/hub-api/issues/39
  const endpoint = `/widgets/${widget.id}/fill`;
  const body = { fill };

  return api.post(endpoint, body);

  // dispatch({
  //   type: MobActionTypes.UPDATE_WIDGET_SUCCESS,
  //   payload: updateWidget(state, data),
  // });

  // AnalyticsEvents.pressureSavedData();
};

// const updateWidget = (state: any, payload: any) => {
//   const { widget_id: id, count } = payload;
//   const widget = MobSelectors(state, null).getWidget(id);
//   return { ...widget, count };
// };

export default asyncFillWidget;
