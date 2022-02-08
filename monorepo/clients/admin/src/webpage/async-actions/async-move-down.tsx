import { gql } from "graphql-request";
import * as t from '../action-types'
import apiGraphql from './api-graphql'
// import { createAction } from './create-action'
// import AuthSelectors from '../../../account/redux/selectors'
import Selectors from '../selectors'

export const UPDATE_BLOCKS_POSITION = gql`
  mutation ($objects: [blocks_insert_input!]!) {
    insert_blocks(
      objects: $objects,
      on_conflict: {
        constraint: blocks_pkey,
        update_columns: [position]
      }
    ) {
      returning {
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
  }
`;

export default (dispatch, state) => (block): void => {
  dispatch({ type: t.UPDATE_BLOCK_REQUEST })

  const blocks: any[] = Selectors(state).getBlocks()
  const nextBlock = blocks[blocks.indexOf(blocks.find(b => b.id === block.id)) + 1]

  const updatedBlocks = [
    {
      ...block,
      position: nextBlock.position
    },
    {
      ...nextBlock,
      position: block.position
    }
  ];

  apiGraphql.request(UPDATE_BLOCKS_POSITION, { objects: updatedBlocks })
    .then((data) => {
      dispatch({ type: t.UPDATE_BLOCK_BATCH, payload: data.insert_blocks.returning })
    })
    .catch((error) => {
      dispatch({ type: t.UPDATE_BLOCK_FAILURE, payload: error });
    })

  // return api
  //   .put(`/mobilizations/${mobilization.id}/blocks`, body, { headers })
  //   .then(res => {
  //     dispatch(createAction(t.UPDATE_BLOCK_BATCH, res.data))
  //   })
  //   .catch(async error => {
  //     dispatch(createAction(t.UPDATE_BLOCK_FAILURE, error))
  //     return Promise.reject(error)
  //   })
}
