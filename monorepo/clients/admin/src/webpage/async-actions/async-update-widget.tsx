import { gql } from "graphql-request";
import apiGraphql from './api-graphql';
import * as t from '../action-types';

export const UPDATE_WIDGET = gql`
  mutation ($widget: widgets_set_input, $id: Int!) {
    update_widgets_by_pk(_set: $widget, pk_columns: { id: $id }) {
      created_at
      deleted_at
      block_id
      exported_at
      goal
      id
      block_id
      kind
      lg_size
      mailchimp_recurring_active_segment_id
      mailchimp_recurring_inactive_segment_id
      mailchimp_segment_id
      mailchimp_unique_segment_id
      md_size
      settings
      sm_size
      updated_at
    }
  }
`;

export default (dispatch) => ({ redirect, ...widget }: any): void => {
  dispatch({ type: t.UPDATE_WIDGET_REQUEST });

  apiGraphql.request(UPDATE_WIDGET, { widget, id: widget.id })
    .then((data) => {
      dispatch({ type: t.UPDATE_WIDGET_SUCCESS, payload: data.update_widgets_by_pk });
    })
    .catch((error) => {
      dispatch({ type: t.UPDATE_WIDGET_FAILURE, payload: error });
    })
}
