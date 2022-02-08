import type { State } from '../reducers';
import { gql } from "graphql-request";
import apiGraphql from './api-graphql';
import * as t from "../action-types";

const FETCH_BLOCKS_AND_WIDGETS = gql`
  query ($mobilization_id: Int) {
    blocks(where: {mobilization_id: {_eq: $mobilization_id}}) {
      bg_class
      bg_image
      created_at
      deleted_at
      hidden
      id
      menu_hidden
      mobilization_id
      name
      position
      updated_at
    }

    widgets(where: {block: {mobilization_id: {_eq: $mobilization_id}}}) {
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

const fetchBlocksAndWidgets = (_state: State, dispatch) => (mobilization_id: number): void => {
  dispatch({ type: t.FETCH_BLOCKS_REQUEST });
  dispatch({ type: t.FETCH_WIDGETS_REQUEST });

  apiGraphql.request(FETCH_BLOCKS_AND_WIDGETS, { mobilization_id })
    .then((data) => {
      dispatch({ type: t.FETCH_BLOCKS_SUCCESS, payload: data.blocks });
      dispatch({ type: t.FETCH_WIDGETS_SUCCESS, payload: data.widgets });
    })
    .catch((error) => {
      dispatch({ type: t.FETCH_BLOCKS_FAILURE, payload: error });
      dispatch({ type: t.FETCH_WIDGETS_FAILURE, payload: error });
    })
}

export default fetchBlocksAndWidgets;