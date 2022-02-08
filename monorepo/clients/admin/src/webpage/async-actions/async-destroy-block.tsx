import { gql } from "graphql-request";
import apiGraphql from './api-graphql';
import * as t from '../action-types';

export const DELETE_LOGIC_BLOCK = gql`
  mutation ($block: blocks_set_input, $id: Int!) {
    update_blocks_by_pk(_set: $block, pk_columns: { id: $id }) {
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
  }
`;

export default (dispatch) => ({
  scrollTopReached,
  offsetTop,
  ...block
}: any): void => {
  dispatch({ type: t.DESTROY_BLOCK_REQUEST });

  apiGraphql.request(DELETE_LOGIC_BLOCK, {
    block: {...block, deleted_at: new Date().toUTCString()},
    id: block.id
  }).then((data) => {
    dispatch({ type: t.DESTROY_BLOCK_SUCCESS, payload: data.update_blocks_by_pk })
  }).catch((error) => {
    dispatch({ type: t.DESTROY_BLOCK_FAILURE, payload: error })
  })
}
